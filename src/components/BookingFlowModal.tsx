'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Clock, Check, ArrowRight, ArrowLeft, CalendarCheck, User, Mail, Phone, MessageSquare } from 'lucide-react';
import styles from './BookingFlowModal.module.css';

interface Property {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
}

export default function BookingFlowModal({ property, children }: { property: Property, children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  
  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const timePeriods = ['Morning', 'Afternoon', 'Evening'];

  // Form State
  const [formData, setFormData] = useState({
    date: dates[0].toISOString().split('T')[0],
    period: timePeriods[0],
    exactTime: '10:00',
    name: '',
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
    const text = `Hi, I would like to request a viewing for *${property.title}* (TRV-${property.id}).%0A%0A*Name:* ${formData.name}%0A*Date:* ${formData.date}%0A*Time:* ${formData.exactTime} (${formData.period})%0A*Message:* ${formData.message || '-'}`;
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
                
                {/* Property Cover Image & Details */}
                <div className={styles.propertyCoverCard}>
                  {property.imageUrl && (
                    <img src={property.imageUrl} alt={property.title} className={styles.propertyCoverImg} />
                  )}
                  <div className={styles.propertyCoverInfo}>
                    <span className={styles.propertyCoverLabel}>VIEWING REQUEST</span>
                    <strong className={styles.propertyCoverTitle}>{property.title}</strong>
                    <div className={styles.propertyCoverPrice}>
                      Rp {property.price.toLocaleString('id-ID')} <span>/mo</span>
                    </div>
                  </div>
                </div>

                <div className={styles.sectionHeader}>
                  <h4>Select Date</h4>
                </div>
                <div className={styles.dateSelectorScroll}>
                  {dates.map((d, idx) => {
                    const dateStr = d.toISOString().split('T')[0];
                    const isSelected = formData.date === dateStr;
                    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNum = d.getDate();
                    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
                    return (
                      <div 
                        key={idx} 
                        className={`${styles.datePill} ${isSelected ? styles.datePillActive : ''}`}
                        onClick={() => setFormData({...formData, date: dateStr})}
                      >
                        <span className={styles.datePillMonth}>{monthName}</span>
                        <strong className={styles.datePillNum}>{dayNum}</strong>
                        <span className={styles.datePillDay}>{dayName}</span>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.sectionHeader}>
                  <h4>Select Time</h4>
                </div>
                <div className={styles.timeSelectorScroll}>
                  {timePeriods.map((period, idx) => {
                    const isSelected = formData.period === period;
                    return (
                      <div 
                        key={idx} 
                        className={`${styles.timePill} ${isSelected ? styles.timePillActive : ''}`}
                        onClick={() => {
                          let defaultTime = '10:00';
                          if (period === 'Afternoon') defaultTime = '14:00';
                          if (period === 'Evening') defaultTime = '18:00';
                          setFormData({...formData, period: period, exactTime: defaultTime});
                        }}
                      >
                        {period}
                      </div>
                    );
                  })}
                </div>

                {/* Animated Exact Time Picker */}
                {formData.period && (
                   <div className={styles.exactTimeContainer}>
                     <label className={styles.exactTimeLabel}>Set specific time ({formData.period})</label>
                     <input 
                       type="time" 
                       className={styles.exactTimeInput}
                       value={formData.exactTime}
                       onChange={(e) => setFormData({...formData, exactTime: e.target.value})}
                     />
                   </div>
                )}

                <div className={styles.sectionHeader} style={{ marginTop: '1.5rem' }}>
                  <h4>Your Details</h4>
                </div>
                <div className={styles.inputGroup} style={{ marginBottom: '0.75rem' }}>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className={styles.inputField} 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <button 
                  className={styles.bookBtn} 
                  onClick={handleSubmit} 
                  style={{ width: '100%', backgroundColor: '#D4F721', color: '#111', marginTop: '1.5rem' }}
                  disabled={!formData.name || !formData.date || !formData.exactTime}
                >
                  <MessageSquare size={18} /> Request via WhatsApp
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
