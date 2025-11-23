import React, { useState, useRef, useEffect } from 'react';
import { Col, Input, Label, FormFeedback } from 'reactstrap';
import { FaChevronDown } from 'react-icons/fa';

const CustomTimePicker = ({ time, setTime, timeError }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({
    top: 0,
    left: 0,
    width: 0,
    openUpward: false
  });

  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null); // <---- NEW

  const pad = (num) => String(num).padStart(2, '0');

  // Time list generator
  const times = [];
  for (let h = 0; h < 1; h++) {
    for (let m = 0; m < 60; m++) {
      for (let s = 0; s < 60; s += 10) {
        times.push(`${pad(h)}:${pad(m)}:${pad(s)}`);
      }
    }
  }

  // Close only when clicking OUTSIDE both input + dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target) && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // Close dropdown when mouse moves OUTSIDE input + dropdown
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target) && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
   
  // Open dropdown
  const openDropdown = () => {
    if (!inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = 250;

    const openUpward = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;

    setDropdownPos({
      top: openUpward ? rect.top - dropdownHeight - 5 : rect.bottom + 5,
      left: rect.left,
      width: rect.width,
      openUpward
    });

    setShowDropdown(true);
  };

  // Scroll active item into view
  useEffect(() => {
    if (!dropdownRef.current) return;

    const activeItem = dropdownRef.current.querySelector('.active-item');
    if (activeItem) {
      activeItem.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  // Keyboard Navigation
  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < times.length - 1 ? prev + 1 : prev));
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) {
        setTime(times[activeIndex]);
        setShowDropdown(false);
      }
    }
  };

  return (
    <Col lg={3} md={6} sm={6}>
      <Label className='header-child'>
        Time <span className='mandatory'>*</span>
      </Label>

      <div ref={inputRef} style={{ position: 'relative' }}>
        <Input value={time} readOnly invalid={timeError} placeholder='HH:MM:SS' id="input" className='form-control-md' onClick={openDropdown} onKeyDown={handleKeyDown} style={{ paddingRight: '35px', cursor: 'pointer' }} />

        <FaChevronDown
          onClick={openDropdown}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: '#6c757d'
          }}
          size={16}
        />
      </div>

      {timeError && <FormFeedback type='invalid'>Time is required</FormFeedback>}

      {showDropdown && (
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: dropdownPos.width,
            maxHeight: '250px',
            overflowY: 'auto',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            zIndex: 99999,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}>
          {times.map((t, idx) => (
            <div
              key={idx}
              onClick={() => {
                setTime(t);
                setShowDropdown(false);
              }}
              onMouseEnter={() => setActiveIndex(idx)}
              className={activeIndex === idx ? 'active-item' : ''}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '14px',
                borderBottom: '1px solid #f1f1f1',
                background: activeIndex === idx ? '#e9ecef' : 'white'
              }}>
              {t}
            </div>
          ))}
        </div>
      )}
    </Col>
  );
};

export default CustomTimePicker;
