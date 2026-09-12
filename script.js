function showMessage() {
    alert("Hello! Now we going for PDF!");
}

function payNow() {
    const upiId = "yourupi@bank";

    const paymentUrl =
        "upi://pay?pa=" + upiId +
        "&pn=PK%20Classes" +
        "&am=10" +
        "&cu=INR";

    window.location.href = paymentUrl;
}
