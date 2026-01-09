/**
 * madsplat | IntaSend API Service
 
const IntaSendService = {
  // Replace with your actual IntaSend Publishable Test Key
  publicKey: "ISPubKey_test_your_key_here",

  initiatePayment: (amount, email, phone) => {
    const intasend = new window.IntaSend({
      public_key: IntaSendService.publicKey,
      live: false,
    });

    intasend
      .buttons({
        amount: amount,
        currency: "KES",
        email: email,
        phone_number: phone,
      })
      .on("COMPLETE", (res) => {
        localStorage.setItem("lastTx", JSON.stringify(res));
        // Redirects to result.html in the root directory
        window.location.href = "result.html?status=success";
      })
      .on("FAILED", (res) => {
        window.location.href = "result.html?status=failed";
      })
      .on("IN-PROGRESS", () => console.log("Payment in progress..."));
  },
};
*/
