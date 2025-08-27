// DOMREALCE: Analytics utilities for enhanced tracking

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// DOMREALCE: GA4 form submit tracking
export function trackFormSubmit(formId: string, additionalData?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'form_submit',
    form_id: formId,
    page_path: window.location.pathname,
    page_title: document.title,
    timestamp: new Date().toISOString(),
    ...additionalData
  });
  
  console.log('📊 DOMREALCE: Form submit tracked:', formId);
}

// DOMREALCE: Enhanced WhatsApp click tracking with origin
export function trackWhatsAppClick(origin: string, phoneNumber?: string) {
  if (typeof window === 'undefined') return;
  
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'whatsapp_click',
    click_origin: origin,
    page_path: window.location.pathname,
    page_title: document.title,
    phone_number: phoneNumber || '+351930682725',
    timestamp: new Date().toISOString()
  });
  
  console.log('📱 DOMREALCE: WhatsApp click tracked:', origin);
}

// DOMREALCE: Page view tracking for SPA
export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('config', 'GA_MEASUREMENT_ID', {
    page_path: path,
    page_title: title || document.title
  });
  
  console.log('📄 DOMREALCE: Page view tracked:', path);
}

// DOMREALCE: Conversion tracking
export function trackConversion(action: string, category: string, value?: number) {
  if (typeof window === 'undefined') return;
  
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'conversion',
    event_category: category,
    event_action: action,
    event_value: value,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString()
  });
  
  console.log('🎯 DOMREALCE: Conversion tracked:', action, category);
}