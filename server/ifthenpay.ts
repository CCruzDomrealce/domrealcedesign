import crypto from 'crypto';

// IfthenPay Configuration
interface IfthenPayConfig {
  mbKey?: string;
  mbwayKey?: string;
  payshopKey?: string;
  ccardKey?: string;
  gatewayKey?: string;
  antiPhishingKey?: string;
  sandbox?: boolean;
}

// Payment Methods
export type PaymentMethod = 'multibanco' | 'mbway' | 'payshop' | 'creditcard' | 'paybylink';

// Payment Request Interfaces
interface BasePaymentRequest {
  orderId: string;
  amount: number;
  description?: string;
  customerEmail?: string;
  customerPhone?: string;
}

interface MultibancoRequest extends BasePaymentRequest {}

interface MBWayRequest extends BasePaymentRequest {
  phone: string;
}

interface PayshopRequest extends BasePaymentRequest {}

interface CreditCardRequest extends BasePaymentRequest {
  successUrl: string;
  errorUrl: string;
  cancelUrl: string;
}

interface PayByLinkRequest extends BasePaymentRequest {
  expiryDays?: number;
  methods?: string[];
}

// Response Interfaces
interface MultibancoResponse {
  entity: string;
  reference: string;
  amount: number;
  orderId: string;
}

interface MBWayResponse {
  requestId: string;
  amount: number;
  orderId: string;
  status: string;
}

interface PayshopResponse {
  reference: string;
  amount: number;
  orderId: string;
  validUntil: string;
}

interface CreditCardResponse {
  paymentUrl: string;
  requestId: string;
  amount: number;
  orderId: string;
}

interface PayByLinkResponse {
  paymentUrl: string;
  requestId: string;
  amount: number;
  orderId: string;
}

export class IfthenPayService {
  private config: IfthenPayConfig;
  private baseUrl: string;

  constructor(config: IfthenPayConfig) {
    this.config = config;
    this.baseUrl = config.sandbox 
      ? 'https://api.ifthenpay.com' 
      : 'https://api.ifthenpay.com';
  }

  private generateReference(orderId: string): string {
    // Generate a simple reference based on orderId
    const timestamp = Date.now().toString().slice(-6);
    return `${timestamp}${Math.floor(Math.random() * 1000)}`.padStart(9, '0');
  }

  // Multibanco Payment
  async createMultibancoPayment(request: MultibancoRequest): Promise<MultibancoResponse> {
    if (!this.config.mbKey) {
      throw new Error('MB Key is required for Multibanco payments');
    }

    // Use POST method with proper URL structure
    const url = `${this.baseUrl}/multibanco`;
    const body = new URLSearchParams({
      mbKey: this.config.mbKey,
      orderId: request.orderId,
      amount: request.amount.toFixed(2),
    });
    
    console.log('Multibanco Request URL:', url);
    console.log('Multibanco Request Body:', body.toString());

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`Multibanco API error: ${response.status}`);
      }

      const text = await response.text();
      console.log('Multibanco API Response (text):', text);
      
      // Verificar se a resposta está vazia
      if (!text || text.trim() === '') {
        throw new Error('API IfthenPay retornou resposta vazia. Verifique a chave MB ou contacte o suporte.');
      }
      
      // Try to parse as JSON, fallback to text processing
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        // Se não conseguiu fazer parse como JSON, tentar como texto separado por |
        const parts = text.trim().split('|');
        if (parts.length >= 3) {
          data = {
            Status: parts[0],
            Entity: parts[1],
            Reference: parts[2],
          };
        } else {
          throw new Error(`Formato de resposta inválido da API IfthenPay: ${text}`);
        }
      }
      
      if (data.Status !== '000') {
        console.log('Multibanco Error Details:', {
          status: data.Status,
          message: data.Message,
          fullResponse: data
        });
        throw new Error(`Multibanco error: ${data.Message || `Status ${data.Status}`}`);
      }

      return {
        entity: data.Entity,
        reference: data.Reference,
        amount: request.amount,
        orderId: request.orderId,
      };
    } catch (error) {
      console.error('Error creating Multibanco payment:', error);
      throw error;
    }
  }

  // MB WAY Payment
  async createMBWayPayment(request: MBWayRequest): Promise<MBWayResponse> {
    if (!this.config.mbwayKey) {
      throw new Error('MBWAY Key is required for MB WAY payments');
    }

    const url = `${this.baseUrl}/spg/payment/mbway`;
    const payload = {
      mbwayKey: this.config.mbwayKey,
      orderId: request.orderId,
      amount: request.amount.toFixed(2),
      mobileNumber: request.phone,
      description: request.description || `Pagamento ${request.orderId}`,
    };


    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`MB WAY API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.Status !== '000') {
        console.log('MB WAY Error Details:', {
          status: data.Status,
          message: data.Message,
          fullResponse: data
        });
        throw new Error(`MB WAY error: ${data.Message || `Status ${data.Status}`}`);
      }

      return {
        requestId: data.RequestId,
        amount: request.amount,
        orderId: request.orderId,
        status: data.Status,
      };
    } catch (error) {
      console.error('Error creating MB WAY payment:', error);
      throw error;
    }
  }

  // Payshop Payment
  async createPayshopPayment(request: PayshopRequest): Promise<PayshopResponse> {
    if (!this.config.payshopKey) {
      throw new Error('Payshop Key is required for Payshop payments');
    }

    // Use POST method with proper URL structure
    const url = `${this.baseUrl}/payshop`;
    const body = new URLSearchParams({
      payshopKey: this.config.payshopKey,
      orderId: request.orderId,
      amount: request.amount.toFixed(2),
    });
    
    console.log('Payshop Request URL:', url);
    console.log('Payshop Request Body:', body.toString());

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`Payshop API error: ${response.status}`);
      }

      const text = await response.text();
      console.log('Payshop API Response (text):', text);
      
      // Verificar se a resposta está vazia
      if (!text || text.trim() === '') {
        throw new Error('API IfthenPay retornou resposta vazia. Verifique a chave Payshop ou contacte o suporte.');
      }
      
      // Try to parse as JSON, fallback to text processing
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        // Se não conseguiu fazer parse como JSON, tentar como texto separado por |
        const parts = text.trim().split('|');
        if (parts.length >= 3) {
          data = {
            Status: parts[0],
            Reference: parts[1],
            ValidUntil: parts[2],
          };
        } else {
          throw new Error(`Formato de resposta inválido da API IfthenPay Payshop: ${text}`);
        }
      }
      
      if (data.Status !== '000') {
        console.log('Payshop Error Details:', {
          status: data.Status,
          message: data.Message,
          fullResponse: data
        });
        throw new Error(`Payshop error: ${data.Message || `Status ${data.Status}`}`);
      }

      return {
        reference: data.Reference,
        amount: request.amount,
        orderId: request.orderId,
        validUntil: data.ValidUntil,
      };
    } catch (error) {
      console.error('Error creating Payshop payment:', error);
      throw error;
    }
  }

  // Credit Card Payment
  async createCreditCardPayment(request: CreditCardRequest): Promise<CreditCardResponse> {
    if (!this.config.ccardKey) {
      throw new Error('Credit Card Key is required for credit card payments');
    }

    const url = `https://ifthenpay.com/api/creditcard/init/${this.config.ccardKey}`;
    const payload = {
      orderId: request.orderId,
      amount: request.amount.toFixed(2),
      description: request.description || `Pagamento ${request.orderId}`,
      successUrl: request.successUrl,
      errorUrl: request.errorUrl,
      cancelUrl: request.cancelUrl,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Credit Card API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status !== '0') {
        throw new Error(`Credit Card error: ${data.message || 'Unknown error'}`);
      }

      return {
        paymentUrl: data.paymentUrl,
        requestId: data.requestId,
        amount: request.amount,
        orderId: request.orderId,
      };
    } catch (error) {
      console.error('Error creating Credit Card payment:', error);
      throw error;
    }
  }

  // Pay By Link
  async createPayByLink(request: PayByLinkRequest): Promise<PayByLinkResponse> {
    if (!this.config.gatewayKey) {
      throw new Error('Gateway Key is required for Pay By Link');
    }

    const url = `${this.baseUrl}/gateway/pinpay/${this.config.gatewayKey}`;
    const payload = {
      orderId: request.orderId,
      amount: request.amount.toFixed(2),
      description: request.description || `Pagamento ${request.orderId}`,
      expiryDays: request.expiryDays || 3,
      methods: request.methods || ['multibanco', 'mbway', 'payshop', 'creditcard'],
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Pay By Link API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status !== '0') {
        throw new Error(`Pay By Link error: ${data.message || 'Unknown error'}`);
      }

      return {
        paymentUrl: data.paymentUrl,
        requestId: data.requestId,
        amount: request.amount,
        orderId: request.orderId,
      };
    } catch (error) {
      console.error('Error creating Pay By Link:', error);
      throw error;
    }
  }

  // Check MB WAY Payment Status
  async checkMBWayStatus(requestId: string): Promise<{ status: string; message?: string }> {
    if (!this.config.mbwayKey) {
      throw new Error('MBWAY Key is required');
    }

    const url = `${this.baseUrl}/spg/payment/mbway/status`;
    const payload = {
      mbwayKey: this.config.mbwayKey,
      requestId: requestId,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`MB WAY Status API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        status: data.status,
        message: data.message,
      };
    } catch (error) {
      console.error('Error checking MB WAY status:', error);
      throw error;
    }
  }

  // Validate Callback (Webhook)
  validateCallback(
    orderId: string,
    amount: string,
    requestId: string,
    key: string
  ): boolean {
    if (!this.config.antiPhishingKey) {
      console.warn('Anti-phishing key not configured, skipping validation');
      return true;
    }

    // Simple validation - in production, implement proper anti-phishing validation
    return key === this.config.antiPhishingKey;
  }

  // Generate payment reference for offline Multibanco (algorithm-based)
  generateMultibancoReference(entity: string, subEntity: string, orderId: string, amount: number): string {
    // This is a simplified version - implement the full algorithm based on IfthenPay documentation
    const amountStr = (amount * 100).toString().padStart(8, '0');
    const orderStr = orderId.padStart(6, '0').slice(-6);
    const baseReference = subEntity + orderStr + amountStr.slice(-2);
    
    // Calculate check digits (simplified - implement full algorithm)
    const checkDigits = this.calculateCheckDigits(baseReference);
    return baseReference + checkDigits;
  }

  private calculateCheckDigits(reference: string): string {
    // Simplified check digit calculation
    // Implement the full algorithm from IfthenPay documentation
    const sum = reference
      .split('')
      .reduce((acc, digit, index) => acc + parseInt(digit) * (index + 1), 0);
    
    const checkDigit = (sum % 97).toString().padStart(2, '0');
    return checkDigit;
  }
}

// Factory function to create IfthenPay service instance
export function createIfthenPayService(): IfthenPayService {
  const config: IfthenPayConfig = {
    mbKey: process.env.IFTHENPAY_MB_KEY,
    mbwayKey: process.env.IFTHENPAY_MBWAY_KEY,
    payshopKey: process.env.IFTHENPAY_PAYSHOP_KEY,
    ccardKey: process.env.IFTHENPAY_CCARD_KEY,
    gatewayKey: process.env.IFTHENPAY_GATEWAY_KEY,
    antiPhishingKey: process.env.IFTHENPAY_ANTI_PHISHING_KEY,
    sandbox: process.env.NODE_ENV !== 'production',
  };


  return new IfthenPayService(config);
}