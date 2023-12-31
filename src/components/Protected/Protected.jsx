import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Protected(props) {
  const token = localStorage.getItem('token');
  const { Component } = props; // Capitalize Component
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return (
    <div>
      {/* Provide Component as JSX element */}
      {Component && <Component />}
    </div>
  );
}
