'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Clock, Check, ArrowRight, ArrowLeft, CalendarCheck, User, Mail, Phone, MessageSquare } from 'lucide-react';
import styles from './BookingFlowModal.module.css';

interface Property {
  id: string;
  title: string;
  price: number;
}

export default function BookingFlowModal({ property, children }: { property: Property, children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    date: '',
    time: 'Morning (9AM - 12PM)',
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const monthlyPrice = property.price;
  const yearlyPrice = monthlyPrice * 11;

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => { setStep(1); }, 300);
  };

  const forceOpen = () => {
    setIsOpen(true);
  };

  const handleSubmit = () => {
    const text = `Hi, I would like to request a viewing for *${property.title}* (TRV-${property.id}).%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Date:* ${formData.date}%0A*Time:* ${formData.time}%0A*Message:* ${formData.message || '-'}`;
    const whatsappUrl = `https://wa.me/6285174119423?text=${text}`;
    window.open(whatsappUrl, '_blank');
    setStep(3);
  };

  return (
    <>
      {/* TRIGGER BUTTON */}
      {children ? (
        React.isValidElement(children) 
          ? React.cloneElement(children as React.ReactElement<any>, { 
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                forceOpen();
              }
            })
          : <div onClick={forceOpen} style={{ cursor: 'pointer', display: 'contents' }}>{children}</div>
      ) : (
        <div className={styles.triggerWrapper} onClick={forceOpen} style={{ width: '100%', cursor: 'pointer' }}>
          <button 
            className={styles.bookBtn} 
            style={{ width: '100%', margin: 0 }}
          >
             <CalendarCheck size={20} /> Schedule a Visit
          </button>
        </div>
      )}

      {/* MODAL BOTTOM SHEET via Portal */}
      {mounted && isOpen && createPortal(
        <div style={{ position: 'fixed', inset: 0, zIndex: 999999 }}>
          {/* Overlay */}
          <div 
            className={styles.modalOverlay} 
            onClick={handleClose}
            style={{ position: 'absolute', inset: 0, zIndex: 999998 }}
          />
          
          {/* Sheet */}
          <div className={styles.bottomSheet} style={{ zIndex: 999999 }}>
             
            {/* Header */}
            <div className={styles.modalHeader} style={{ marginBottom: '1.5rem' }}>
              <div>
                <h3 className={styles.modalTitle}>
                  {step === 1 ? 'Request Viewing' : 'Inquiry Sent!'}
                </h3>
              </div>
              <button className={styles.closeBtn} onClick={handleClose}>
                <X size={20} color="#111" />
              </button>
            </div>

            {/* Step 1: Combined Form */}
            {step === 1 && (
              <div className={styles.stageContent}>
                
                {/* Property / Booking Details */}
                <div style={{ backgroundColor: '#f9f9fb', borderRadius: '16px', padding: '1rem', marginBottom: '1.5rem', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                   <span style={{ fontSize: '0.8rem', color: '#8e8e93', fontWeight: 600, textTransform: 'uppercase' }}>Property</span>
                   <strong style={{ fontSize: '1.1rem', color: '#111' }}>{property.title}</strong>
                   <div style={{ fontSize: '1rem', color: '#111', marginTop: '0.25rem' }}>
                     Rp {property.price.toLocaleString('id-ID')} <span style={{ fontSize: '0.85rem', color: '#8e8e93' }}>/mo</span>
                   </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111', marginBottom: '1rem' }}>When would you like to view it?</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div className={styles.inputGroup} style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: '0.8rem' }}><Calendar size={14} style={{display: 'inline', marginRight:'4px', color: '#8E8E93'}}/> Date</label>
                      <input 
                        type="date" 
                        className={styles.inputField} 
                        style={{ padding: '0.75rem' }}
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                    <div className={styles.inputGroup} style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: '0.8rem' }}><Clock size={14} style={{display: 'inline', marginRight:'4px', color: '#8E8E93'}}/> Time</label>
                      <select 
                        className={styles.inputField}
                        style={{ padding: '0.75rem' }}
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                      >
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Late Afternoon</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111', marginBottom: '1rem' }}>Your Information</h4>
                  <div className={styles.inputGroup} style={{ marginBottom: '0.75rem' }}>
                    <label style={{ fontSize: '0.8rem' }}><User size={14} style={{display: 'inline', marginRight:'4px', color: '#8E8E93'}}/> Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className={styles.inputField} 
                      style={{ padding: '0.75rem' }}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className={styles.inputGroup} style={{ marginBottom: '0.75rem' }}>
                    <label style={{ fontSize: '0.8rem' }}><Phone size={14} style={{display: 'inline', marginRight:'4px', color: '#8E8E93'}}/> WhatsApp Number</label>
                    <input 
                      type="tel" 
                      placeholder="+62 812 3456 7890" 
                      className={styles.inputField} 
                      style={{ padding: '0.75rem' }}
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  className={styles.bookBtn} 
                  onClick={handleSubmit} 
                  style={{ width: '100%', backgroundColor: '#D4F721', color: '#111' }}
                  disabled={!formData.name || !formData.phone || !formData.date}
                >
                  Request via WhatsApp
                </button>
              </div>
            )}

            {/* Success Step */}
            {step === 3 && (
              <div className={styles.successContainer}>
                <div className={styles.successIcon}>
                   <Check size={32} strokeWidth={3} />
                </div>
                <h4 className={styles.successTitle}>Inquiry Confirmed!</h4>
                <p className={styles.successText}>
                  Your visit for <strong>{property.title}</strong> has been scheduled. Our team will contact you to confirm the details.
                </p>
                <button className={styles.bookBtn} onClick={handleClose} style={{ backgroundColor: '#111', color: '#fff' }}>
                  Return to Property
                </button>
              </div>
            )}

          </div>
        </div>,
        document.body
      )}
    </>
  );
}
