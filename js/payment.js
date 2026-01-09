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
      amount: amount * 100, // Converts KES to cents
      currency: "KES", // HARDCODED to KES to avoid USD errors
      ref: "MS-" + Date.now(),

      metadata: {
        custom_fields: [
          {
            display_name: "Transaction Type",
            variable_name: "transaction_type",
            value: "Admin Deposit",
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: phone,
          },
        ],
      },

      callback: function (response) {
        // Save transaction and redirect
        localStorage.setItem("lastTx", JSON.stringify(response));
        window.location.href = "../result.html?status=success";
      },

      onClose: function () {
        alert("Payment cancelled. Your cart is still saved.");
      },
    });

    handler.openIframe();
  },
};
