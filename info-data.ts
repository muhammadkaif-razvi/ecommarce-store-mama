const businessIndustries = [
  "E-commerce",
  "SaaS / Software",
  "Healthcare",
  "Fitness & Wellness",
  "Finance / Banking",
  "Real Estate",
  "Education",
  "Travel & Hospitality",
  "Subscription Services",
  "Home Services (e.g., Cleaning, Plumbing)",
  "Marketing & Advertising",
  "Consulting",
  "Food & Beverage",
  "Beauty & Cosmetics",
  "Agriculture",
  "Manufacturing",
  "Retail",
  "Technology (Non-SaaS)",
  "Media & Entertainment",
  "Non-profit / Social Enterprise",
  "Arts & Crafts",
  "Legal Services",
  "Automotive",
  "Logistics & Transportation",
  "Energy & Utilities",
  "Government & Public Administration",
  "Research & Development",
  "Telecommunications",
  "Other",
];

export default businessIndustries;
const indianAddressData = [
  { city: "Mumbai", pinCode: "400001", state: "Maharashtra" },
  { city: "Mumbai", pinCode: "400002", state: "Maharashtra" },
  { city: "Mumbai", pinCode: "400003", state: "Maharashtra" },
  { city: "Mumbai", pinCode: "400004", state: "Maharashtra" },
  { city: "Mumbai", pinCode: "400005", state: "Maharashtra" },
  { city: "Delhi", pinCode: "110001", state: "Delhi" },
  { city: "Delhi", pinCode: "110002", state: "Delhi" },
  { city: "Delhi", pinCode: "110003", state: "Delhi" },
  { city: "Delhi", pinCode: "110004", state: "Delhi" },
  { city: "Delhi", pinCode: "110005", state: "Delhi" },
  { city: "Bangalore", pinCode: "560001", state: "Karnataka" },
  { city: "Bangalore", pinCode: "560002", state: "Karnataka" },
  { city: "Bangalore", pinCode: "560003", state: "Karnataka" },
  { city: "Bangalore", pinCode: "560004", state: "Karnataka" },
  { city: "Bangalore", pinCode: "560005", state: "Karnataka" },
  { city: "Hyderabad", pinCode: "500001", state: "Telangana" },
  { city: "Hyderabad", pinCode: "500002", state: "Telangana" },
  { city: "Hyderabad", pinCode: "500003", state: "Telangana" },
  { city: "Hyderabad", pinCode: "500004", state: "Telangana" },
  { city: "Hyderabad", pinCode: "500005", state: "Telangana" },
  { city: "Chennai", pinCode: "600001", state: "Tamil Nadu" },
  { city: "Chennai", pinCode: "600002", state: "Tamil Nadu" },
  { city: "Chennai", pinCode: "600003", state: "Tamil Nadu" },
  { city: "Chennai", pinCode: "600004", state: "Tamil Nadu" },
  { city: "Chennai", pinCode: "600005", state: "Tamil Nadu" },
  { city: "Kolkata", pinCode: "700001", state: "West Bengal" },
  { city: "Kolkata", pinCode: "700002", state: "West Bengal" },
  { city: "Kolkata", pinCode: "700003", state: "West Bengal" },
  { city: "Kolkata", pinCode: "700004", state: "West Bengal" },
  { city: "Kolkata", pinCode: "700005", state: "West Bengal" },
  { city: "Pune", pinCode: "411001", state: "Maharashtra" },
  { city: "Pune", pinCode: "411002", state: "Maharashtra" },
  { city: "Pune", pinCode: "411003", state: "Maharashtra" },
  { city: "Pune", pinCode: "411004", state: "Maharashtra" },
  { city: "Pune", pinCode: "411005", state: "Maharashtra" },
  { city: "Ahmedabad", pinCode: "380001", state: "Gujarat" },
  { city: "Ahmedabad", pinCode: "380002", state: "Gujarat" },
  { city: "Ahmedabad", pinCode: "380003", state: "Gujarat" },
  { city: "Ahmedabad", pinCode: "380004", state: "Gujarat" },
  { city: "Ahmedabad", pinCode: "380005", state: "Gujarat" },
  { city: "Jaipur", pinCode: "302001", state: "Rajasthan" },
  { city: "Jaipur", pinCode: "302002", state: "Rajasthan" },
  { city: "Jaipur", pinCode: "302003", state: "Rajasthan" },
  { city: "Jaipur", pinCode: "302004", state: "Rajasthan" },
  { city: "Jaipur", pinCode: "302005", state: "Rajasthan" },
  { city: "Lucknow", pinCode: "226001", state: "Uttar Pradesh" },
  { city: "Lucknow", pinCode: "226002", state: "Uttar Pradesh" },
  { city: "Lucknow", pinCode: "226003", state: "Uttar Pradesh" },
  { city: "Lucknow", pinCode: "226004", state: "Uttar Pradesh" },
  { city: "Lucknow", pinCode: "226005", state: "Uttar Pradesh" },
  { city: "Kanpur", pinCode: "208001", state: "Uttar Pradesh" },
  { city: "Kanpur", pinCode: "208002", state: "Uttar Pradesh" },
  { city: "Nagpur", pinCode: "440001", state: "Maharashtra" },
  { city: "Nagpur", pinCode: "440002", state: "Maharashtra" },
  { city: "Indore", pinCode: "452001", state: "Madhya Pradesh" },
  { city: "Indore", pinCode: "452002", state: "Madhya Pradesh" },
  { city: "Bhopal", pinCode: "462001", state: "Madhya Pradesh" },
  { city: "Bhopal", pinCode: "462002", state: "Madhya Pradesh" },
  { city: "Patna", pinCode: "800001", state: "Bihar" },
  { city: "Patna", pinCode: "800002", state: "Bihar" },
  { city: "Vadodara", pinCode: "390001", state: "Gujarat" },
  { city: "Vadodara", pinCode: "390002", state: "Gujarat" },
  { city: "Surat", pinCode: "395001", state: "Gujarat" },
  { city: "Surat", pinCode: "395002", state: "Gujarat" },
  { city: "Ludhiana", pinCode: "141001", state: "Punjab" },
  { city: "Ludhiana", pinCode: "141002", state: "Punjab" },
  { city: "Agra", pinCode: "282001", state: "Uttar Pradesh" },
  { city: "Agra", pinCode: "282002", state: "Uttar Pradesh" },
  { city: "Nashik", pinCode: "422001", state: "Maharashtra" },
  { city: "Nashik", pinCode: "422002", state: "Maharashtra" },
  { city: "Ranchi", pinCode: "834001", state: "Jharkhand" },
  { city: "Ranchi", pinCode: "834002", state: "Jharkhand" },
  { city: "Chandigarh", pinCode: "160001", state: "Chandigarh" },
  { city: "Chandigarh", pinCode: "160002", state: "Chandigarh" },
  { city: "Amritsar", pinCode: "143001", state: "Punjab" },
  { city: "Amritsar", pinCode: "143002", state: "Punjab" },
  { city: "Coimbatore", pinCode: "641001", state: "Tamil Nadu" },
  { city: "Coimbatore", pinCode: "641002", state: "Tamil Nadu" },
  { city: "Madurai", pinCode: "625001", state: "Tamil Nadu" },
  { city: "Madurai", pinCode: "625002", state: "Tamil Nadu" },
  { city: "Visakhapatnam", pinCode: "530001", state: "Andhra Pradesh" },
  { city: "Visakhapatnam", pinCode: "530002", state: "Andhra Pradesh" },
  { city: "Thiruvananthapuram", pinCode: "695001", state: "Kerala" },
  { city: "Thiruvananthapuram", pinCode: "695002", state: "Kerala" },
  { city: "Guwahati", pinCode: "781001", state: "Assam" },
  { city: "Guwahati", pinCode: "781002", state: "Assam" },
  { city: "Bhubaneswar", pinCode: "751001", state: "Odisha" },
  { city: "Bhubaneswar", pinCode: "751002", state: "Odisha" },
  { city: "Srinagar", pinCode: "190001", state: "Jammu and Kashmir" },
  { city: "Srinagar", pinCode: "190002", state: "Jammu and Kashmir" },
  // ... and many more cities and pin codes across India
];

export { indianAddressData };