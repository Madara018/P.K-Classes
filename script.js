function showMessage() {
    alert("Hello! Now we going for PDF!");
}

async function payNow() {
    try {
        // Step 1: Backend se ₹10 ka order banao
        const orderResponse = await fetch(
            "https://pk-classes-backend.onrender.com/create-order",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const orderData = await orderResponse.json();

        if (!orderResponse.ok) {
            alert(orderData.error || "Order create nahi hua.");
            return;
        }

        // Step 2: Razorpay Checkout
        const options = {
            key: orderData.key_id,
            amount: orderData.amount,
            currency: orderData.currency,
            name: "P.K Classes",
            description: "Class 10 Geography - 22 Days Access",
            order_id: orderData.order_id,

            handler: async function (response) {

                // Step 3: Payment verify
                const verifyResponse = await fetch(
                    "https://pk-classes-backend.onrender.com/verify-payment",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    }
                );

                const verifyData = await verifyResponse.json();

                if (!verifyResponse.ok || !verifyData.success) {
                    alert(verifyData.error || "Payment verification failed.");
                    return;
                }

                // Step 4: Geography PDF open karo
                const pdfUrl =
                    "https://pk-classes-backend.onrender.com/pdf/geography?token="
                    + encodeURIComponent(verifyData.access_token);

                alert("Payment successful! Geography PDF open ho raha hai.");

                window.open(pdfUrl, "_blank");
            },

            theme: {
                color: "#3399cc"
            }
        };

        const razorpay = new Razorpay(options);
        razorpay.open();

    } catch (error) {
        console.error(error);
        alert("Backend se connection nahi ho pa raha.");
    }
}
