// App.js

import React, { useState } from 'react';

// Dummy-Daten für Produkte
const intialProducts = [
    { id: 1, name: "Produkt 1", price: 29.99, stock: 5 },
    { id: 2, name: "Produkt 2", price: 39.99, stock: 3 },
    { id: 3, name: "Produkt 3", price: 19.99, stock: 1 }
];

function App() {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState(intialProducts);  // Produkte im state speichern
    const [purchaseMessage, setPurchaseMessage] = useState("");

    // Funktion zum Hinzufügen eines Produkts zum Warenkorb
    const addToCart = (product) => {
        if (product.stock > 0) {
            setCart([...cart, product]);
            updateProductStock(product.id, -1);  // Verringere den Lagerbestand
        }
    };

    // Funktion zum Entfernen eines Produkts aus dem Warenkorb
    const removeFromCart = (productId) => {
       
        setCart(cart.filter((product) => product.id !== productId));
        updateProductStock(productId, 1);  // Erhöhe den Lagerbestand
        
    };

    //Aktualisierung des Lagerbestands
    const updateProductStock = (productId, change) => {
        setProducts(products.map(product =>
            product.id === productId ? { ...product, stock: product.stock + change } : product
        ));
    };

    // Berechnung der Gesamtsumme des Warenkorbs
    const getTotalPrice = () => {
        return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
    };

    // Funktion für den Kaufvorgang
    const handlePurchase = () => {
        if (cart.length > 0) {
            setCart([]);  // Leert den Warenkorb nach dem Kauf
            setPurchaseMessage("Kauf erfolgreich! Vielen Dank fuer Ihre Bestellung.");
        } else {
            setPurchaseMessage("Ihr Warenkorb ist leer. Bitte fuegen Sie Produkte hinzu.");
        }
    };

    return (
        <div className="App">
            <h1>Webshop</h1>

            <h2>Produkte</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price} ({product.stock} auf Lager)
                        <button onClick={() => addToCart(product)} disabled={product.stock === 0}>
                            In den Warenkorb
                        </button>
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
