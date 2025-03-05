// App.js

import React, { useState } from 'react';

// Dummy-Daten für Produkte
const products = [
    { id: 1, name: "Produkt 1", price: 29.99 },
    { id: 2, name: "Produkt 2", price: 39.99 },
    { id: 3, name: "Produkt 3", price: 19.99 }
];

function App() {
    const [cart, setCart] = useState([]);
    const [purchaseMessage, setPurchaseMessage] = useState("");

    // Funktion zum Hinzufügen eines Produkts zum Warenkorb
    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    // Funktion zum Entfernen eines Produkts aus dem Warenkorb
    const removeFromCart = (productId) => {
        setCart(cart.filter((product) => product.id !== productId));
    };

    // Berechnung der Gesamtsumme des Warenkorbs
    const getTotalPrice = () => {
        return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
    };

    // Funktion für den Kaufvorgang
    const handlePurchase = () => {
        if (cart.length > 0) {
            setCart([]);  // Leert den Warenkorb nach dem Kauf
            setPurchaseMessage("Kauf erfolgreich! Vielen Dank für Ihre Bestellung.");
        } else {
            setPurchaseMessage("Ihr Warenkorb ist leer. Bitte fügen Sie Produkte hinzu.");
        }
    };

    return (
        <div className="App">
            <h1>Webshop</h1>

            <h2>Produkte</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => addToCart(product)}>In den Warenkorb</button>
                    </li>
                ))}
            </ul>

            <h2>Warenkorb</h2>
            <ul>
                {cart.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => removeFromCart(product.id)}>Entfernen</button>
                    </li>
                ))}
            </ul>

            {cart.length > 0 && (
                <>
                    <h3>Gesamtsumme: ${getTotalPrice()}</h3>
                    <button onClick={handlePurchase}>Jetzt kaufen</button>
                </>
            )}

            {/* Zeigt die Kaufbestätigung oder Fehlermeldung an */}
            {purchaseMessage && <p>{purchaseMessage}</p>}
        </div>
    );
}

export default App;
