import React, { useState, useEffect, useRef } from "react";
import { riceData } from "../data/products";
import ThankYouPopup from "../components/ThankYouPopup";
import { ref, push, set } from "firebase/database";
import { quoteDatabase } from "../firebasegetquote";

// Industry-specific grade data (unchanged)
const industryGrades = {
  oil: [
    { value: "Extra Virgin", price: "3.00" }, { value: "Virgin", price: "2.50" },
    { value: "Pure", price: "2.00" }, { value: "Refined", price: "1.80" },
    { value: "Cold Pressed", price: "3.20" }, { value: "Organic", price: "3.50" }
  ],
  construction: [
    { value: "Grade A", price: "150.00" }, { value: "Grade B", price: "120.00" },
    { value: "Industrial Grade", price: "100.00" }, { value: "Commercial Grade", price: "130.00" },
    { value: "Premium Quality", price: "180.00" }, { value: "Standard Quality", price: "110.00" }
  ],
  fruits: [
    { value: "Grade A", price: "2.50" }, { value: "Grade B", price: "1.80" },
    { value: "Export Quality", price: "3.00" }, { value: "Premium", price: "2.80" },
    { value: "Standard", price: "1.50" }, { value: "Organic", price: "3.50" }
  ],
  vegetables: [
    { value: "Grade A", price: "1.20" }, { value: "Grade B", price: "0.80" },
    { value: "Fresh", price: "1.50" }, { value: "Organic", price: "2.00" },
    { value: "Premium", price: "1.80" }, { value: "Standard", price: "0.70" }
  ],
  pulses: [
    { value: "Premium Grade", price: "1.80" }, { value: "Standard Grade", price: "1.20" },
    { value: "Export Quality", price: "2.00" }, { value: "First Quality", price: "1.60" },
    { value: "Commercial Grade", price: "1.00" }, { value: "Top Quality", price: "1.90" },
    { value: "Superior Quality", price: "1.70" }, { value: "Regular Quality", price: "0.90" }
  ],
  spices: [
    { value: "Premium Grade", price: "4.00" }, { value: "Standard Grade", price: "2.50" },
    { value: "Export Quality", price: "5.00" }, { value: "First Quality", price: "3.50" },
    { value: "Commercial Grade", price: "2.00" }, { value: "A Grade", price: "3.80" },
    { value: "B Grade", price: "2.20" }, { value: "C Grade", price: "1.50" },
    { value: "Top Quality", price: "4.20" }, { value: "Superior Quality", price: "3.20" },
    { value: "Regular Quality", price: "1.80" }
  ],
  tea: [
    { value: "Premium Grade", price: "8.00" }, { value: "First Flush", price: "12.00" },
    { value: "Second Flush", price: "10.00" }, { value: "Orthodox", price: "15.00" },
    { value: "CTC", price: "6.00" }, { value: "Green Tea", price: "9.00" },
    { value: "White Tea", price: "18.00" }, { value: "Oolong Tea", price: "14.00" },
    { value: "Darjeeling Tea", price: "20.00" }, { value: "Assam Tea", price: "7.00" },
    { value: "Organic Tea", price: "11.00" }, { value: "Commercial Grade", price: "5.00" }
  ],
  clothes: [
    { value: "Premium Quality", price: "25.00" }, { value: "Export Quality", price: "20.00" },
    { value: "First Quality", price: "18.00" }, { value: "Commercial Grade", price: "12.00" },
    { value: "Standard Quality", price: "15.00" }, { value: "Luxury Grade", price: "35.00" },
    { value: "Boutique Quality", price: "28.00" }, { value: "Mass Market", price: "10.00" },
    { value: "Designer Grade", price: "45.00" }, { value: "Economy Grade", price: "8.00" }
  ],
  chocolate: [
    { value: "Premium Grade", price: "12.00" }, { value: "Belgian Chocolate", price: "15.00" },
    { value: "Swiss Chocolate", price: "14.00" }, { value: "Dark Chocolate", price: "10.00" },
    { value: "Milk Chocolate", price: "8.00" }, { value: "White Chocolate", price: "9.00" },
    { value: "Organic Chocolate", price: "13.00" }, { value: "Sugar-Free", price: "11.00" },
    { value: "Commercial Grade", price: "6.00" }, { value: "Artisanal", price: "18.00" },
    { value: "Couverture", price: "16.00" }, { value: "Compound", price: "5.00" }
  ],
  beverages: [
    { value: "Premium Grade", price: "3.50" }, { value: "Natural", price: "4.00" },
    { value: "Organic", price: "5.00" }, { value: "Sugar-Free", price: "3.80" },
    { value: "Concentrate", price: "2.50" }, { value: "Ready-to-Drink", price: "4.50" },
    { value: "Commercial Grade", price: "2.00" }, { value: "Export Quality", price: "4.20" },
    { value: "First Quality", price: "3.20" }, { value: "Standard Quality", price: "2.80" }
  ],
  perfumes: [
    { value: "Premium Grade", price: "50.00" }, { value: "Luxury", price: "80.00" },
    { value: "Designer", price: "65.00" }, { value: "Niche", price: "95.00" },
    { value: "Export Quality", price: "45.00" }, { value: "Commercial Grade", price: "25.00" },
    { value: "First Quality", price: "40.00" }, { value: "Standard Quality", price: "30.00" },
    { value: "Organic", price: "55.00" }, { value: "Natural", price: "60.00" }
  ],
  flowers: [
    { value: "Premium Grade", price: "2.50" }, { value: "Export Quality", price: "3.00" },
    { value: "First Quality", price: "2.20" }, { value: "Commercial Grade", price: "1.50" },
    { value: "Standard Quality", price: "1.80" }, { value: "Luxury Grade", price: "4.00" },
    { value: "Organic", price: "2.80" }, { value: "Fresh Cut", price: "2.00" },
    { value: "Bouquet Quality", price: "3.20" }, { value: "Event Grade", price: "1.20" }
  ],
  'dry fruits': [
    { value: "Premium Grade", price: "8.00" }, { value: "Export Quality", price: "9.00" },
    { value: "First Quality", price: "7.50" }, { value: "Commercial Grade", price: "5.00" },
    { value: "Standard Quality", price: "6.00" }, { value: "Organic", price: "10.00" },
    { value: "Natural", price: "8.50" }, { value: "Roasted", price: "7.00" },
    { value: "Raw", price: "6.50" }, { value: "Salted", price: "7.20" },
    { value: "Unsalted", price: "7.50" }, { value: "Blanched", price: "8.20" }
  ],
  electronics: [
    { value: "Premium Grade", price: "100.00" }, { value: "Brand New", price: "120.00" },
    { value: "Refurbished", price: "80.00" }, { value: "Original", price: "110.00" },
    { value: "Standard Quality", price: "90.00" }
  ],
  default: [
    { value: "Premium Grade", price: "2.00" }, { value: "Standard Grade", price: "1.50" },
    { value: "Export Quality", price: "2.50" }, { value: "First Quality", price: "1.80" },
    { value: "Commercial Grade", price: "1.20" }
  ]
};

// Industry-specific quantity options (unchanged)
const industryQuantityOptions = {
  rice: [
    "5 Kg", "10 Kg", "25 Kg", "50 Kg", "100 Kg", "500 Kg", 
    "1 Ton", "5 Tons", "10 Tons", "Custom Quantity"
  ],
  pulses: [
    "5 Kg", "10 Kg", "25 Kg", "50 Kg", "100 Kg", "500 Kg", 
    "1 Ton", "5 Tons", "10 Tons", "Custom Quantity"
  ],
  spices: [
    "10 g", "50 g", "100 g", "250 g", "500 g", "1 Kg", 
    "5 Kg", "10 Kg", "25 Kg", "50 Kg", "Custom Quantity"
  ],
  'dry fruits': [
    "1 Kg", "5 Kg", "10 Kg", "25 Kg", "50 Kg", "100 Kg", 
    "500 Kg", "1 Ton", "Custom Quantity"
  ],
  tea: [
    "1 Kg", "5 Kg", "10 Kg", "25 Kg", "50 Kg", "100 Kg", 
    "500 Kg", "1 Ton", "Custom Quantity"
  ],
  chocolate: [
    "1 Kg", "5 Kg", "10 Kg", "25 Kg", "50 Kg", "100 Kg", 
    "Custom Quantity"
  ],
  fruits: [
    "10 Kg", "25 Kg", "50 Kg", "100 Kg", "500 Kg", 
    "1 Ton", "5 Tons", "10 Tons", "Custom Quantity"
  ],
  vegetables: [
    "10 Kg", "25 Kg", "50 Kg", "100 Kg", "500 Kg", 
    "1 Ton", "5 Tons", "10 Tons", "Custom Quantity"
  ],
  oil: [
    "1 Liter", "5 Liters", "10 Liters", "25 Liters", "50 Liters", 
    "100 Liters", "500 Liters", "1000 Liters", "Custom Quantity"
  ],
  beverages: [
    "1 Liter", "5 Liters", "10 Liters", "25 Liters", "50 Liters", 
    "100 Liters", "500 Liters", "1000 Liters", "Custom Quantity"
  ],
  perfumes: [
    "50 ml", "100 ml", "250 ml", "500 ml", "1 Liter", 
    "5 Liters", "10 Liters", "Custom Quantity"
  ],
  flowers: [
    "1 Piece", "1 Dozen", "2 Dozen", "5 Dozen", "10 Dozen",
    "50 Pieces", "100 Pieces", "1 Bouquet", "5 Bouquets", "Custom Quantity"
  ],
  clothes: [
    "1 Piece", "10 Pieces", "50 Pieces", "100 Pieces", 
    "500 Pieces", "1000 Pieces", "Custom Quantity"
  ],
  electronics: [
    "1 Piece", "5 Pieces", "10 Pieces", "50 Pieces", 
    "100 Pieces", "Custom Quantity"
  ],
  default: [
    "5 Kg", "10 Kg", "25 Kg", "50 Kg", "100 Kg", "500 Kg", 
    "1 Ton", "5 Tons", "10 Tons", "Custom Quantity"
  ]
};

// Define port prices (example values, adjust as needed)
const portPrices = {
  "Mundra": 10.00,
  "Kandla": 12.00,
  "Nhava Sheva": 15.00,
  "Chennai": 18.00,
  "Vizag": 14.00,
  "Kolkata": 16.00,
  "Other": 20.00
};

const BuyModal = ({ isOpen, onClose, product, profile, industry }) => {
  const [packing, setPacking] = useState("");
  const [quantity, setQuantity] = useState("");
  const [customQuantity, setCustomQuantity] = useState("");
  const [port, setPort] = useState("");
  const [grade, setGrade] = useState("");
  const [cifRequired, setCifRequired] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [grades, setGrades] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantityOptions, setQuantityOptions] = useState([]);
  const [portPrice, setPortPrice] = useState(0.00); // New state for port price
  const canvasRef = useRef(null);
  const countrySelectRef = useRef(null);

  const countryOptions = [
    { value: "+91", flag: "🇮🇳", name: "India", length: 10 },
    { value: "+1", flag: "🇺🇸", name: "USA", length: 10 },
    { value: "+44", flag: "🇬🇧", name: "UK", length: 10 },
    { value: "+971", flag: "🇦🇪", name: "UAE", length: 9 },
    { value: "+61", flag: "🇦🇺", name: "Australia", length: 9 },
    { value: "+98", flag: "🇮🇷", name: "Iran", length: 10 },
  ];

  const packingOptions = [
    "PP Bags", "Non-Woven Bags", "Jute Bags", "BOPP Bags", "LDPE Bags",
    "HDPE Bags", "Paper Bags", "Vacuum Packed", "Bulk Packaging", "Custom Packaging"
  ];

  const cifOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];

  // Load quantity options based on industry
  useEffect(() => {
    if (isOpen && industry) {
      const industryKey = industry.toLowerCase();
      const options = industryQuantityOptions[industryKey] || industryQuantityOptions.default;
      setQuantityOptions(options);
    }
  }, [isOpen, industry]);

  // Load grades based on industry and product
  useEffect(() => {
    if (isOpen && product && industry) {
      let industryGradesList = [];
      
      if (industry === 'Rice') {
        const variety = product.variety || product.name || '';
        if (variety) {
          const varietyEntries = riceData.filter((e) => {
            const dataVariety = e.variety?.trim().toLowerCase() || '';
            const searchVariety = variety.trim().toLowerCase();
            return dataVariety.includes(searchVariety) || searchVariety.includes(dataVariety);
          });
          
          const uniqueGrades = [...new Set(varietyEntries
            .map((e) => ({
              value: e.grade,
              price: (e.price_inr / 83).toFixed(2) // Convert INR to USD (assuming 1 USD = 83 INR)
            }))
            .filter(grade => grade.value && grade.value.trim() !== '')
          )].sort((a, b) => a.value.localeCompare(b.value));
          
          industryGradesList = uniqueGrades;
        }
      } else {
        const industryKey = industry.toLowerCase();
        industryGradesList = industryGrades[industryKey] || industryGrades.default;
      }
      
      setGrades(industryGradesList);
      
      if (industryGradesList.length === 1) {
        setGrade(industryGradesList[0].value);
      } else {
        setGrade("");
      }
    } else {
      setGrades([]);
      setGrade("");
    }
  }, [isOpen, product?.variety, product?.name, industry]);

  // Prefill form fields with profile data
  useEffect(() => {
    if (isOpen && profile) {
      const nameValue = profile.fullName || profile.displayName || profile.name || "";
      setFullName(nameValue);
      setEmail(profile.email || "");
      if (profile.phone) {
        const phoneParts = profile.phone.split(" ");
        if (phoneParts.length > 1) {
          setCountryCode(phoneParts[0]);
          setPhoneNumber(phoneParts.slice(1).join(" ").replace(/\D/g, ""));
        } else {
          setCountryCode("+91");
          setPhoneNumber(profile.phone.replace(/\D/g, ""));
        }
      }
    }
  }, [isOpen, profile]);

  // Ensure country select is focusable
  useEffect(() => {
    if (isOpen && !profile && countrySelectRef.current) {
      countrySelectRef.current.focus();
    }
  }, [isOpen, profile]);

  // Update port price when port changes
  useEffect(() => {
    setPortPrice(port ? portPrices[port] || 0.00 : 0.00);
  }, [port]);

  const validatePhoneNumber = (number, code) => {
    const selectedCountry = countryOptions.find((opt) => opt.value === code);
    const expectedLength = selectedCountry?.length || 10;
    if (!number) {
      setPhoneError("Phone number is required");
      return false;
    } else if (number.length !== expectedLength) {
      setPhoneError(`Phone number must be ${expectedLength} digits`);
      return false;
    } else if (!/^\d+$/.test(number)) {
      setPhoneError("Phone number must contain only digits");
      return false;
    } else {
      setPhoneError("");
      return true;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleCountryChange = (e) => {
    e.preventDefault();
    const newCode = e.target.value;
    setCountryCode(newCode);
    setPhoneNumber("");
    setPhoneError("");
  };

  const handlePhoneChange = (e) => {
    e.preventDefault();
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
    validatePhoneNumber(value, countryCode);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    
    if (value !== "Custom Quantity") {
      setCustomQuantity("");
    }
  };

  // Calculate estimated bill
  const calculateEstimatedBill = () => {
    let basePrice = 0;
    let quantityValue = 0;
    let quantityPrice = 0;
    let packingCost = 0;

    // Get base price from grade
    if (industry === 'Rice' && product && grade) {
      const productData = riceData.find(
        (item) => item.variety === product.variety && item.grade === grade
      );
      if (productData) {
        basePrice = parseFloat((productData.price_inr / 83).toFixed(2)); // Convert INR to USD
      }
    } else if (grade) {
      const selectedGrade = grades.find((g) => g.value === grade);
      basePrice = selectedGrade ? parseFloat(selectedGrade.price) : 0;
    }

    // Parse quantity
    if (quantity === "Custom Quantity" && customQuantity) {
      const match = customQuantity.match(/^(\d+\.?\d*)\s*(kg|ton|liter|ml|piece|dozen|bouquet)s?$/i);
      if (match) {
        quantityValue = parseFloat(match[1]);
        const unit = match[2].toLowerCase();
        if (unit === 'ton') quantityValue *= 1000; // Convert tons to kg
        if (unit === 'liter') quantityValue *= 1; // Liters remain as is
        if (unit === 'ml') quantityValue /= 1000; // Convert ml to liters
        if (['piece', 'dozen', 'bouquet'].includes(unit)) quantityValue *= 1; // Treat as single units
      }
    } else if (quantity) {
      const match = quantity.match(/^(\d+\.?\d*)\s*(kg|ton|liter|ml|piece|dozen|bouquet)s?$/i);
      if (match) {
        quantityValue = parseFloat(match[1]);
        const unit = match[2].toLowerCase();
        if (unit === 'ton') quantityValue *= 1000;
        if (unit === 'liter') quantityValue *= 1;
        if (unit === 'ml') quantityValue /= 1000;
        if (['piece', 'dozen', 'bouquet'].includes(unit)) quantityValue *= 1;
      }
    }

    // Calculate quantity price
    if (basePrice > 0 && quantityValue > 0) {
      quantityPrice = (basePrice * quantityValue).toFixed(2);
    }

    // Calculate packing cost
    if (packing && quantityValue > 0) {
      packingCost = (quantityValue * 0.05).toFixed(2); // $0.05 per unit
    }

    const total = (
      parseFloat(quantityPrice || 0) +
      parseFloat(packingCost || 0) +
      parseFloat(portPrice || 0)
    ).toFixed(2);

    return {
      basePrice: basePrice.toFixed(2),
      quantity: quantityValue,
      quantityPrice,
      packingCost,
      portPrice: portPrice.toFixed(2), // New port price field
      total
    };
  };

  const estimatedBill = calculateEstimatedBill();

  const saveQuoteToFirebase = async (quoteData) => {
    try {
      const quotesRef = ref(quoteDatabase, 'quotes');
      const newQuoteRef = push(quotesRef);
      const quoteDataWithId = {
        ...quoteData,
        id: newQuoteRef.key,
        createdAt: new Date().toISOString(),
        status: 'new',
        storedIn: 'firebasegetquote-database'
      };
      await set(newQuoteRef, quoteDataWithId);
      return newQuoteRef.key;
    } catch (error) {
      console.error('Error saving quote to firebasegetquote database:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    let finalQuantity = "";
    if (quantity === "Custom Quantity") {
      if (!customQuantity.trim()) {
        alert("Please enter your custom quantity.");
        return;
      }
      finalQuantity = customQuantity;
    } else if (!quantity) {
      alert("Please select a quantity.");
      return;
    } else {
      finalQuantity = quantity;
    }

    if (!packing || !port || !fullName || !cifRequired || !grade) {
      alert("Please fill all required fields.");
      return;
    }
    
    const isPhoneValid = validatePhoneNumber(phoneNumber, countryCode);
    const isEmailValid = validateEmail(email);
    
    if (!isPhoneValid || !isEmailValid) {
      if (!isPhoneValid) alert("Please enter a valid phone number.");
      if (!isEmailValid) alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    const fullPhoneNumber = `${countryCode} ${phoneNumber}`;
    const selectedGradeData = grades.find(g => g.value === grade);
    const gradePrice = selectedGradeData?.price || '';

    const quoteData = {
      contactInfo: {
        fullName,
        email,
        phone: fullPhoneNumber,
        countryCode
      },
      productInfo: {
        industry: industry,
        category: product?.brand || "",
        productName: product?.name || "",
        variety: product?.variety || product?.name || "",
        grade: grade,
        gradePrice: gradePrice,
        packing,
        quantity: finalQuantity,
        port,
        cifRequired: cifRequired === "yes",
        additionalInfo
      },
      estimatedBill: {
        basePrice: estimatedBill.basePrice,
        quantity: finalQuantity,
        quantityPrice: estimatedBill.quantityPrice,
        packingCost: estimatedBill.packingCost,
        portPrice: estimatedBill.portPrice, // New port price field
        total: estimatedBill.total
      },
      timestamp: new Date().toISOString(),
      source: 'website',
      database: 'firebasegetquote'
    };

    try {
      const quoteId = await saveQuoteToFirebase(quoteData);
      const message = `Hello! I want a quote for:
- Name: ${fullName}
- Email: ${email}
- Phone: ${fullPhoneNumber}
- Industry: ${industry}
- Product: ${product?.name || ""}
- Grade: ${grade}${gradePrice ? ` (Price: $${gradePrice})` : ''}
- Packing: ${packing}
- Quantity: ${finalQuantity}
- Port: ${port}
- Port Cost: $${estimatedBill.portPrice}
- CIF Required: ${cifRequired === "yes" ? "Yes" : "No"}
- Packing Cost: $${estimatedBill.packingCost}
- Estimated Total: $${estimatedBill.total}
- Quote ID: ${quoteId}
- Database: firebasegetquote
${additionalInfo ? `\n- Additional Info: ${additionalInfo}` : ""}
Thank you!`;
      
      window.open(
        `https://wa.me/+919703744571?text=${encodeURIComponent(message)}`,
        "_blank"
      );
      
      setShowThankYou(true);
    } catch (error) {
      const fallbackMessage = `Hello! I want a quote for:
- Name: ${fullName}
- Email: ${email}
- Phone: ${fullPhoneNumber}
- Industry: ${industry}
- Product: ${product?.name || ""}
- Grade: ${grade}${gradePrice ? ` (Price: $${gradePrice})` : ''}
- Packing: ${packing}
- Quantity: ${finalQuantity}
- Port: ${port}
- Port Cost: $${estimatedBill.portPrice}
- CIF Required: ${cifRequired === "yes" ? "Yes" : "No"}
- Packing Cost: $${estimatedBill.packingCost}
- Estimated Total: $${estimatedBill.total}
- Database: firebasegetquote (save failed)
${additionalInfo ? `\n- Additional Info: ${additionalInfo}` : ""}
Thank you!`;
      
      window.open(
        `https://wa.me/+919703744571?text=${encodeURIComponent(fallbackMessage)}`,
        "_blank"
      );
      
      setShowThankYou(true);
      alert("Quote submitted to WhatsApp! There was an issue saving to firebasegetquote database, but your request has been sent.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setPacking("");
    setQuantity("");
    setCustomQuantity("");
    setPort("");
    setGrade("");
    setCifRequired("");
    setAdditionalInfo("");
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setCountryCode("+91");
    setPhoneError("");
    setEmailError("");
    setShowThankYou(false);
    setIsSubmitting(false);
    setPortPrice(0.00); // Reset port price
    onClose();
  };

  const getCurrentCountry = () =>
    countryOptions.find((opt) => opt.value === countryCode);

  if (!isOpen) return null;

  return (
    <div className="buy-modal-overlay">
      <div className="buy-modal-container">
        <canvas ref={canvasRef} className="buy-modal-canvas" />
        <button
          className="buy-modal-close-btn"
          onClick={handleClose}
          aria-label="Close modal"
          disabled={isSubmitting}
        >
          &times;
        </button>
        <div className="buy-modal-header">
          <h2 className="buy-modal-title">Get Quote - {industry}</h2>
        </div>
        <div className="buy-modal-content flex">
          {/* Scrollable Form Section */}
          <div className="buy-modal-form-section w-1/2 pr-4 overflow-y-auto">
            <div className="buy-modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <section className="form-section">
                  <h3>Contact Information</h3>
                  <label>
                    Full Name *
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={handleFullNameChange}
                      required
                      className="input-field"
                      readOnly={!!profile}
                      disabled={isSubmitting}
                    />
                  </label>
                  <label>
                    Email Address *
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      className="input-field"
                      readOnly={!!profile}
                      disabled={isSubmitting}
                    />
                    {emailError && <div className="error-text">{emailError}</div>}
                  </label>
                  <label>
                    Phone Number *
                    <div className="phone-input-group flex w-full gap-2">
                      <select
                        ref={countrySelectRef}
                        value={countryCode}
                        onChange={handleCountryChange}
                        className="country-code-select flex-1 basis-1/4 min-w-[80px] input-field"
                        style={{ zIndex: 1002, position: 'relative' }}
                        disabled={isSubmitting}
                      >
                        {countryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.flag} {option.value}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        placeholder={`Enter phone number (${getCurrentCountry()?.length || 10} digits)`}
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        maxLength={getCurrentCountry()?.length || 10}
                        required
                        className="input-field flex-1 basis-3/4"
                        disabled={isSubmitting}
                      />
                    </div>
                    {phoneError && <div className="error-text">{phoneError}</div>}
                  </label>
                </section>
                <section className="form-section">
                  <h3>Product Information</h3>
                  <label>
                    Industry
                    <input
                      type="text"
                      value={industry || ""}
                      readOnly
                      className="input-field"
                    />
                  </label>
                  <label>
                    Category
                    <input
                      type="text"
                      value={product?.brand || ""}
                      readOnly
                      className="input-field"
                    />
                  </label>
                  <label>
                    Product
                    <input
                      type="text"
                      value={product?.name || ""}
                      readOnly
                      className="input-field"
                    />
                  </label>
                  <label>
                    Grade *
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      required
                      className="select-field"
                      disabled={isSubmitting}
                    >
                      <option value="">Select Grade</option>
                      {grades.length > 0 ? (
                        grades.map((gradeOption, i) => (
                          <option key={i} value={gradeOption.value}>
                            {gradeOption.value}{gradeOption.price ? ` ($${gradeOption.price})` : ''}
                          </option>
                        ))
                      ) : (
                        <option disabled>Loading grades...</option>
                      )}
                    </select>
                    <small className="text-gray-400">
                      {industry === 'Rice' ? 'Specific rice grades based on variety' : 'Industry standard grades'}
                    </small>
                  </label>
                  <label>
                    Packing *
                    <select
                      value={packing}
                      onChange={(e) => setPacking(e.target.value)}
                      required
                      className="select-field"
                      disabled={isSubmitting}
                    >
                      <option value="">Select Packing</option>
                      {packingOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Quantity *
                    <select
                      value={quantity}
                      onChange={handleQuantityChange}
                      required
                      className="select-field"
                      disabled={isSubmitting}
                    >
                      <option value="">Select Quantity</option>
                      {quantityOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {quantity === "Custom Quantity" && (
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Enter your custom quantity"
                          value={customQuantity}
                          onChange={(e) => setCustomQuantity(e.target.value)}
                          className="input-field w-full"
                          disabled={isSubmitting}
                        />
                        <small className="text-gray-400">Choose your preferred quantity</small>
                      </div>
                    )}
                  </label>
                  <label>
                    Port of Loading *
                    <select
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                      required
                      className="select-field"
                      disabled={isSubmitting}
                    >
                      <option value="">Select Port</option>
                      <option value="Mundra">Mundra</option>
                      <option value="Kandla">Kandla</option>
                      <option value="Nhava Sheva">Nhava Sheva</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Vizag">Vizag</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Other">Other (Specify in Additional Info)</option>
                    </select>
                  </label>
                  <label>
                    CIF Required? *
                    <select
                      value={cifRequired}
                      onChange={(e) => setCifRequired(e.target.value)}
                      required
                      className="select-field"
                      disabled={isSubmitting}
                    >
                      <option value="">Select Option</option>
                      {cifOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <small className="text-gray-400">
                      CIF includes shipping and insurance costs to your destination port
                    </small>
                  </label>
                  <label>
                    Additional Information
                    <textarea
                      placeholder="Any additional details or requirements"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      className="textarea-field"
                      disabled={isSubmitting}
                    />
                  </label>
                </section>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Get Quote"}
                </button>
              </form>
            </div>
          </div>
          {/* Fixed Estimated Bill Section */}
          <div className="buy-modal-bill-section w-1/2 pl-4 bg-white/5 rounded-lg">
            <div className="cost-breakdown-section p-6">
              <h4 className="text-lg font-semibold text-secondary mb-4">Estimated Cost Breakdown</h4>
              <div className="flex justify-between mb-2">
                <span>Product:</span>
                <span>{product?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Grade:</span>
                <span>{grade || 'N/A'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Quantity Price:</span>
                <span>${estimatedBill.quantityPrice || '0.00'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Packing Price:</span>
                <span>${estimatedBill.packingCost || '0.00'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Port Price:</span>
                <span>${estimatedBill.portPrice || '0.00'}</span>
              </div>
              <div className="flex justify-between font-bold mt-4 pt-2 border-t border-gray-600">
                <span>Total Estimated Cost:</span>
                <span>${estimatedBill.total || '0.00'}</span>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Note: This is an estimated cost. Actual costs may vary based on additional requirements and market conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ThankYouPopup
        isOpen={showThankYou}
        onClose={() => {
          setShowThankYou(false);
          onClose();
        }}
      />
    </div>
  );
};

export default BuyModal;