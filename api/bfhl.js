// User information
const USER_INFO = {
    full_name: "sai_kiran_t_v", // Must be lowercase with underscores
    birth_date: "22112002", 
    email: "saikiran.tv2022@vitstudent.ac.in", 
    roll_number: "22BPS1172" 
};

// Helper function to process array data
function processArray(data) {
    const result = {
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        numbers: []
    };

    data.forEach(item => {
        const str = String(item);
        
        // Check if it's a number
        if (!isNaN(str) && !isNaN(parseFloat(str)) && isFinite(str)) {
            const num = parseInt(str);
            result.numbers.push(num);
            if (num % 2 === 0) {
                result.even_numbers.push(str);
            } else {
                result.odd_numbers.push(str);
            }
        }
        // Check if it's alphabetic
        else if (/^[a-zA-Z]+$/.test(str)) {
            result.alphabets.push(str.toUpperCase());
        }
        // Check if it's a special character
        else if (/^[^a-zA-Z0-9\s]+$/.test(str)) {
            result.special_characters.push(str);
        }
    });

    return result;
}

// Helper function to create concatenated string with alternating caps
function createConcatenatedString(alphabets) {
    // Get all alphabetical characters and reverse
    const allChars = alphabets.join('').split('').reverse();
    
    // Apply alternating caps (first char uppercase, second lowercase, etc.)
    return allChars.map((char, index) => {
        return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
    }).join('');
}

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Handle GET request
    if (req.method === 'GET') {
        res.status(200).json({
            operation_code: 1
        });
        return;
    }

    // Handle POST request
    if (req.method === 'POST') {
        try {
            const { data } = req.body;

            // Validate input
            if (!data || !Array.isArray(data)) {
                return res.status(400).json({
                    is_success: false,
                    message: "Invalid input: 'data' should be an array"
                });
            }

            // Process the input array
            const processed = processArray(data);
            
            // Calculate sum of numbers
            const sum = processed.numbers.reduce((acc, num) => acc + num, 0);
            
            // Create concatenated string with alternating caps
            const concat_string = createConcatenatedString(processed.alphabets);

            // Generate user_id
            const user_id = `${USER_INFO.full_name}_${USER_INFO.birth_date}`;

            // Build response
            const response = {
                is_success: true,
                user_id: user_id,
                email: USER_INFO.email,
                roll_number: USER_INFO.roll_number,
                odd_numbers: processed.odd_numbers,
                even_numbers: processed.even_numbers,
                alphabets: processed.alphabets,
                special_characters: processed.special_characters,
                sum: sum.toString(),
                concat_string: concat_string
            };

            res.status(200).json(response);

        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({
                is_success: false,
                message: "Internal server error"
            });
        }
        return;
    }

    // Method not allowed
    res.status(405).json({
        is_success: false,
        message: "Method not allowed"
    });
}
