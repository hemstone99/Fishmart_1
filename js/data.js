const products = [
      {
        id: 1,
        name: "Tilapia (Fresh)",
        price: 500,
        image: "../assets/Tilapia Fish.jpeg",
        description: "Fresh from local fish farms",
        category: "Freshwater Fish"
    },
   
    {
        id: 2,
        name: "Nile Perch (Fresh)",
        price: 650,
        image: "../assets/Nile perch (2).jpeg",
        description: "Lake Victoria catch, whole fish",
        category: "Freshwater Fish"
    },
    {
        id: 3,
        name: "Catfish (Fresh)",
        price: 450,
        image: "../assets/catfish.jpeg",
        description: "Local pond-raised catfish",
        category: "Freshwater Fish"
    },
    {
        id: 4,
        name: "Mudfish (Fresh)",
        price: 400,
        image: "../assets/mudfish.jpeg",
        description: "Traditional favorite from Western Kenya",
        category: "Freshwater Fish"
    },
    
    // LAKE FISH
    {
        id: 5,
        name: "Rainbow Trout (Fresh)",
        price: 1100,
        image: "../assets/Rainbow trout.jpeg",
        description: "From Kenyan highland farms",
        category: "Lake Fish"
    },
    {
        id: 6,
        name: "Lungfish (Kamongo)",
        price: 380,
        image: "../assets/African Lung fish.jpeg",
        description: "Smoked traditional delicacy",
        category: "Lake Fish"
    },
    
    // OCEAN FISH
    {
        id: 7,
        name: "Tuna (Whole)",
        price: 800,
        image: "../assets/tuna.jpeg",
        description: "Fresh from Indian Ocean",
        category: "Ocean Fish"
    },
    {
        id: 8,
        name: "Tuna Steak",
        price: 1800,
        image: "../assets/tuna steak.jpeg",
        description: "Premium cut, boneless",
        category: "Ocean Fish"
    },
    {
        id: 9,
        name: "Kingfish (Fresh)",
        price: 950,
        image: "../assets/kingfish.jpeg",
        description: "Coastal favorite for grilling",
        category: "Ocean Fish"
    },
     {
        id: 10,
        name: "Parrotfish (Fresh)",
        price: 750,
        image: "../assets/Parrot Fish.jpeg",
        description: "Colorful reef fish",
        category: "Ocean Fish"
    },
    
    // SMALL FISH
    {
        id: 11,
        name: "Omena (Silver Cyprinid)",
        price: 350,
        image: "../assets/Silver Cyprinid.jpeg",
        description: "Dried, protein-rich",
        category: "Small Fish"
    },
    {
        id: 12,
        name: "Dagaa (Fresh)",
        price: 280,
        image: "../assets/dagaa.jpeg",
        description: "Small sardine-like fish",
        category: "Small Fish"
    },
    
    // SHELLFISH
    {
        id: 13,
        name: "Prawns (Fresh)",
        price: 1500,
        image: "../assets/Prawns.jpeg",
        description: "Large coastal prawns",
        category: "Shellfish"
    },
    {
        id: 14,
        name: "Crab (Live)",
        price: 1200,
        image: "../assets/Crab.jpeg",
        description: "Local mangrove crabs",
        category: "Shellfish"
    },
    {
        id: 15,
        name: "Lobster (Live)",
        price: 3800,
        image: "../assets/Lobster.jpeg",
        description: "Indian Ocean spiny lobster",
        category: "Shellfish"
    },
    
    // PROCESSED
    {
        id: 16,
        name: "Smoked Catfish",
        price: 600,
        image: "../assets/Smoked Catfish.jpeg",
        description: "Traditional smoking method",
        category: "Processed Fish"
    },
    {
        id: 17,
        name: "Salted Tilapia",
        price: 550,
        image: "../assets/Salted Tilapia.jpeg",
        description: "Preserved for longer shelf life",
        category: "Processed Fish"
    },
    
    // EXOTIC
    {
        id: 18,
        name: "Atlantic Salmon (Frozen)",
        price: 3200,
        image: "../assets/salmon.jpeg",
        description: "Imported Norwegian salmon",
        category: "Exotic Fish"
    },
    {
        id: 19,
        name: "Barramundi (Fresh)",
        price: 2200,
        image: "../assets/Barramundi.jpeg",
        description: "Premium white-flesh fish",
        category: "Exotic Fish"
    },
   {
        id: 20,
        name: "Mbuta (Fresh)",
        price: 700,
        image: "../assets/mbuta.jpg",
        description: "Lake Victoria predator fish",
        category: "Freshwater Fish"
    },
    {
        id: 21,
        name: "Fry Tilapia (Small)",
        price: 300,
        image: "../assets/Fried tilapia.jpeg",
        description: "Juvenile tilapia for frying",
        category: "Freshwater Fish"
    },
    {
        id: 22,
        name: "Eel (Fresh)",
        price: 850,
        image: "../assets/Eel.jpeg",
        description: "Snake-like freshwater fish",
        category: "Freshwater Fish"
    },
    {
        id: 23,
        name: "Marlin Steak",
        price: 2500,
        image: "../assets/Marlin Steak.jpeg",
        description: "Deep sea game fish",
        category: "Ocean Fish"
    },
    {
        id: 24,
        name: "Swordfish Steak",
        price: 2800,
        image: "../assets/swordfish.jpg",
        description: "Meaty ocean fish",
        category: "Ocean Fish"
    },
    {
        id: 25,
        name: "Squid (Cleaned)",
        price: 900,
        image: "../assets/Squid (Cleaned).jpeg",
        description: "Ready-to-cook tubes",
        category: "Shellfish"
    },
    {
        id: 26,
        name: "Octopus (Cleaned)",
        price: 1300,
        image: "../assets/Octopus (Cleaned).jpeg",
        description: "Tenderized for cooking",
        category: "Shellfish"
    },
    {
        id: 27,
        name: "Clams (Live)",
        price: 600,
        image: "../assets/clams.jpeg",
        description: "Fresh from Shimoni",
        category: "Shellfish"
    },
    {
        id: 28,
        name: "Sea Urchin",
        price: 800,
        image: "../assets/Sea Urchins.jpeg",
        description: "Coastal delicacy",
        category: "Shellfish"
    },
    {
        id: 29,
        name: "Anchovies (Dried)",
        price: 450,
        image: "../assets/Anchovies (Dried).jpeg",
        description: "For flavoring dishes",
        category: "Small Fish"
    },
    {
        id: 30,
        name: "Whitebait (Fresh)",
        price: 350,
        image: "../assets/whitebait.webp",
        description: "Tiny whole fish for frying",
        category: "Small Fish"
    },
    {
        id: 31,
        name: "Tilapia Fillet (Skinless)",
        price: 750,
        image: "../assets/tilapia-fillet-Skinless.jpg",
        description: "Boneless convenience cut",
        category: "Processed Fish"
    },
    {
        id: 32,
        name: "Fish Sausages",
        price: 650,
        image: "../assets/Fish Sausages.jpeg",
        description: "Ready-to-cook",
        category: "Processed Fish"
    },
    {
        id: 33,
        name: "Cod (Frozen)",
        price: 1800,
        image: "../assets/Cod (Frozen).jpeg",
        description: "Imported from Europe",
        category: "Exotic Fish"
    },
    {
        id: 34,
        name: "Sea Bass (Fresh)",
        price: 1600,
        image: "../assets/Sea Bass (Fresh).jpeg",
        description: "Mediterranean variety",
        category: "Exotic Fish"
    },
    {
        id: 35,
        name: "Tilapia Fingerlings",
        price: 15,
        image: "../assets/Tilapia Fingerlings.jpeg",
        description: "For fish farming (per piece)",
        category: "Live Fish"
    },
    {
        id: 36,
        name: "Carp (Fresh)",
        price: 480,
        image: "../assets/Carp (Fresh).jpeg",
        description: "Freshwater bottom feeder",
        category: "Freshwater Fish"
    },
    {
        id: 37,
        name: "Tilapia Whole (Frozen)",
        price: 420,
        image: "../assets/Tilapia Whole (Frozen).jpeg",
        description: "Frozen whole fish",
        category: "Processed Fish"
    },
    {
        id: 38,
        name: "Fish Maw (Dried)",
        price: 2800,
        image: "../assets/Fish Maw (Dried).jpeg",
        description: "Premium delicacy",
        category: "Specialty"
    },
    {
        id: 39,
        name: "Fish Balls (Ready)",
        price: 550,
        image: "../assets/Fish Balls (Ready).jpeg",
        description: "For soups and stews",
        category: "Processed Fish"
    },
    {
        id: 40,
        name: "Fish Powder",
        price: 1200,
        image: "../assets/Fish Powder.jpeg",
        description: "For fortifying foods (per kg)",
        category: "Specialty"
    }
]
export default products;