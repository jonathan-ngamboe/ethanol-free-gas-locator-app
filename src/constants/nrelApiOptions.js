// Available payment methods based on station details
export const cards_accepted = [
    { id: 'all', label: 'All', icon: 'select-all' },
    { id: 'ACCOUNT_BALANCE', label: 'Account Balance', icon: 'bank' },
    { id: 'A', label: 'American Express', icon: 'credit-card' },
    { id: 'ALLIANCE', label: 'Alliance AutoGas', icon: 'gas-station' },
    { id: 'ANDROID_PAY', label: 'Android Pay', icon: 'android' },
    { id: 'APPLE_PAY', label: 'Apple Pay', icon: 'apple' },
    { id: 'ARI', label: 'ARI', icon: 'credit-card' },
    { id: 'CASH', label: 'Cash', icon: 'cash' },
    { id: 'CHECKS', label: 'Check', icon: 'note-outline' },
    { id: 'CleanEnergy', label: 'Clean Energy', icon: 'leaf' },
    { id: 'CFN', label: 'Commercial Fueling Network', icon: 'truck-delivery' },
    { id: 'Comdata', label: 'Comdata', icon: 'card-account-details' },
    { id: 'CREDIT', label: 'Credit', icon: 'credit-card' },
    { id: 'DEBIT', label: 'Debit', icon: 'credit-card' },
    { id: 'D', label: 'Discover', icon: 'credit-card' },
    { id: 'EFS', label: 'EFS', icon: 'card-account-details' },
    { id: 'FleetOne', label: 'Fleet One', icon: 'truck-fast' },
    { id: 'FuelMan', label: 'Fuelman', icon: 'fuel' },
    { id: 'GasCard', label: 'GASCARD', icon: 'card-text' },
    { id: 'M', label: 'MasterCard', icon: 'credit-card' },
    { id: 'PacificPride', label: 'Pacific Pride', icon: 'earth' },
    { id: 'PHH', label: 'PHH', icon: 'credit-card' },
    { id: 'Proprietor', label: 'Proprietor Fleet Card', icon: 'card-bulleted' },
    { id: 'Speedway', label: 'Speedway', icon: 'speedometer' },
    { id: 'SuperPass', label: 'SuperPass', icon: 'card-account-details' },
    { id: 'TCH', label: 'TCH', icon: 'credit-card' },
    { id: 'Tchek', label: 'T-Chek T-Card', icon: 'credit-card' },
    { id: 'Trillium', label: 'Trillium', icon: 'gas-station-outline' },
    { id: 'V', label: 'Visa', icon: 'credit-card' },
    { id: 'Voyager', label: 'Voyager', icon: 'compass-outline' },
    { id: 'Wright_Exp', label: 'WEX', icon: 'credit-card' }
];
    

// Status options
export const statusOptions = [
    { id: 'E', label: 'Available', icon: 'check-circle' },
    { id: 'P', label: 'Planned', icon: 'clock-outline' },
    { id: 'T', label: 'Unavailable', icon: 'alert-circle' }
];

// Access types
export const accessTypes = [
    { id: 'all', label: 'All', icon: 'select-all' },
    { id: 'public', label: 'Public', icon: 'account-group-outline' },
    { id: 'private', label: 'Private', icon: 'lock' }
    ];

// Ethanol blends
export const otherEthanolBlends = [
    { id: 'E85', label: 'E85' },
    { id: 'E20-E25', label: 'E20-E25' },
    { id: 'E30-E35', label: 'E30-E35' },
    { id: 'E40-Plus', label: 'E40-Plus' },
];

// Station access info
export const accessDetailCodes = [
    { id: 'CALL', label: 'Call ahead', icon: 'phone' },
    { id: 'KEY_AFTER_HOURS', label: 'Card key after hours', icon: 'key' },
    { id: 'KEY_ALWAYS', label: 'Card key at all times', icon: 'key-variant' },
    { id: 'CREDIT_CARD_AFTER_HOURS', label: 'Credit card after hours', icon: 'credit-card-clock' },
    { id: 'CREDIT_CARD_ALWAYS', label: 'Credit card at all times', icon: 'credit-card' },
    { id: 'FLEET', label: 'Fleet customers only', icon: 'truck' },
    { id: 'GOVERNMENT', label: 'Government only', icon: 'account-tie' },
    { id: 'LIMITED_HOURS', label: 'Limited hours', icon: 'clock-outline' },
    { id: 'RESIDENTIAL', label: 'Residential', icon: 'home' }
];