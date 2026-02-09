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

  private readonly paypalClientId = 'sb';
  private paypalButtonsInitialized = false;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    void this.initializePayPal();
  }

  private async initializePayPal(): Promise<void> {
    try {
      await this.loadPaypalScript();
      this.renderPayPalButtons();
    } catch (error) {
      console.error('Failed to initialize PayPal SDK', error);
    }
  }

  private loadPaypalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.paypal) {
        resolve();
        return;
      }

      const existingScript = document.querySelector('script[data-paypal-sdk="true"]') as HTMLScriptElement | null;
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(), { once: true });
        existingScript.addEventListener('error', () => reject(new Error('Failed to load PayPal SDK.')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${this.paypalClientId}&currency=USD`;
      script.async = true;
      script.defer = true;
      script.dataset['paypalSdk'] = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load PayPal SDK.'));

      document.body.appendChild(script);
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
