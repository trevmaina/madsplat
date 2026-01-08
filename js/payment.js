/**
 * madsplat | Paystack Payment Service
 */
const PaymentService = {
  // Use your TEST public key for now
  publicKey: "pk_live_b85dfd970f2f578758d65a5edbd69317a1e9a7cc",

  initiatePayment: (amount, email, phone) => {
    const handler = PaystackPop.setup({
      key: PaymentService.publicKey,
      email: email,
      amount: amount * 100, // Paystack requires amount in subunits (KES cents)
      currency: "KES",
      ref: "MS-" + Date.now(), // Generates a unique reference for every attempt

      // Metadata allows you to see these details in your Paystack Dashboard
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Phone",
            variable_name: "customer_phone",
            value: phone,
          },
        ],
      },

      callback: function (response) {
        // Successful payment logic
        console.log("Payment Successful! Ref: " + response.reference);
        localStorage.setItem("lastTx", JSON.stringify(response));

        // Use a relative path to go back to the root for result.html
        window.location.href = "../result.html?status=success";
      },

      onClose: function () {
        // User closed the popup manually
        alert("Payment cancelled. Your cart is still saved.");
      },
    });

    handler.openIframe();
  },
};
