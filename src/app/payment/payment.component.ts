import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type PayPalButtonsInstance = {
  render: (container: string) => Promise<void>;
};

type PayPalNamespace = {
  Buttons: (config: {
    onClick?: (data: any, actions: any) => Promise<void> | void;
    createOrder: (data: any, actions: any) => Promise<string>;
    onApprove: (data: any, actions: any) => Promise<void>;
    onError?: (error: any) => Promise<void> | void;
  }) => PayPalButtonsInstance;
};

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

@Component(
  {
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
  }
)
export class PaymentComponent implements AfterViewInit {
  public amountDetails = new FormGroup({
    amount: new FormControl<number | null>(null, [Validators.required, Validators.min(1)])
  });

  private readonly paypalSdkSelector = 'script[data-paypal-sdk="true"], script[src*="paypal.com/sdk/js"]';
  private paypalButtonsInitialized = false;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    void this.initializePayPal();
  }

  private async initializePayPal(): Promise<void> {
    try {
      await this.ensurePayPalSdkReady();
      this.renderPayPalButtons();
    } catch (error) {
      console.error('Failed to initialize PayPal SDK', error);
    }
  }

  private async ensurePayPalSdkReady(): Promise<void> {
    if (window.paypal) {
      return;
    }

    const existingScript = document.querySelector(this.paypalSdkSelector);
    if (!existingScript) {
      throw new Error('PayPal SDK script was not found. Ensure it is loaded in index.html.');
    }

    await this.waitForPaypalAvailability();
  }

  private waitForPaypalAvailability(): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeoutMs = 10000;
      const intervalMs = 50;
      let elapsed = 0;

      const timer = window.setInterval(() => {
        if (window.paypal) {
          window.clearInterval(timer);
          resolve();
          return;
        }

        elapsed += intervalMs;
        if (elapsed >= timeoutMs) {
          window.clearInterval(timer);
          reject(new Error('PayPal SDK did not become available in time.'));
        }
      }, intervalMs);
    });
  }

  private renderPayPalButtons(): void {
    if (!window.paypal || this.paypalButtonsInitialized) {
      return;
    }

    this.paypalButtonsInitialized = true;
    window.paypal.Buttons({
      onClick: (_data: any, actions: any) => {
        if (this.amountDetails.invalid) {
          this.amountDetails.markAllAsTouched();
          return actions.reject();
        }

        return actions.resolve();
      },
      createOrder: (_data: any, actions: any) => {
        const amount = this.getValidatedAmount();
        if (amount === null) {
          return Promise.reject(new Error('Please enter a valid amount.'));
        }

        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount.toFixed(2)
            }
          }]
        });
      },
      onApprove: async (_data: any, actions: any) => {
        const details = await actions.order.capture();
        const paymentId = typeof details?.id === 'string' ? details.id : '';
        if (paymentId) {
          localStorage.setItem('payment', paymentId);
        }

        await this.router.navigate(['/success']);
      },
      onError: async (_error: any) => {
        await this.router.navigate(['/failed']);
      }
    }).render('#paypal-button-container').catch(async (_error: unknown) => {
      this.paypalButtonsInitialized = false;
      await this.router.navigate(['/failed']);
    });
  }

  private getValidatedAmount(): number | null {
    const rawAmount = this.amountDetails.controls.amount.value;
    const amount = Number(rawAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return null;
    }

    return amount;
  }
}
