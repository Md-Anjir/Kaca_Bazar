import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

function TermsAndConditions() {
  return (
    <>
      <Header />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto"}}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "35px", fontWeight: "bold" , backgroundColor: "#e2f8c5", padding: "8px"}}>
          Terms and Conditions
        </h1>

        <p>
          Welcome to <strong style={{ fontSize: "20px", fontWeight: "bold", color: "green"}}>Kaca Bazar</strong>, your trusted online marketplace
          where farmers can sell agricultural products directly to customers.
          Please read these Terms and Conditions carefully before using our
          platform. By using our services, you agree to comply with these
          terms.
        </p>
        <br></br>
        <h2 style={{ fontSize: "18px", fontWeight: "bold"}}>1. Introduction</h2>
        <p>
          Kaca Bazar is an online platform designed to connect farmers with
          customers who are looking to purchase fresh and locally produced
          agricultural products. By using our platform, you agree to abide by
          these Terms and Conditions.
        </p>
        <br></br>

        <h2 style={{ fontSize: "18px", fontWeight: "bold"}}>2. Account Registration</h2>
        <p>
          To use our platform, you must create an account. By registering,
          you agree to provide accurate and complete information. You are
          responsible for maintaining the confidentiality of your account
          credentials and for all activities that occur under your account.
        </p>
        <br></br>

        <h2 style={{ fontSize: "18px", fontWeight: "bold"}}>3. Eligibility</h2>
        <p>
          To register as a farmer or customer, you must be at least 18 years
          old. By creating an account, you confirm that you meet the eligibility
          requirements.
        </p>
        <br></br>

        <h2 style={{ fontSize: "18px", fontWeight: "bold"}}>4. Selling Agricultural Products</h2>
        <p>
          Farmers can list agricultural products for sale on Kaca Bazar. All
          products must comply with local regulations and must be accurately
          described. Kaca Bazar reserves the right to remove any product
          listings that violate our terms or local laws.
        </p>
        <br></br>

        <h2 style={{ fontSize: "18px", fontWeight: "bold"}}>5. Buying Agricultural Products</h2>
        <p>
          Customers can browse and purchase products from farmers listed on Kaca
          Bazar. By placing an order, you agree to pay the listed price and any
          applicable taxes or fees. All transactions are processed through our
          secure payment gateway.
        </p>
        <br></br>

        <h2 style={{ fontSize: "18px", fontWeight: "bold"}}>6. Payment and Fees</h2>
        <p>
          Kaca Bazar facilitates payments between farmers and customers. Farmers
          will receive payments for their products after successful delivery. A
          small transaction fee may apply to cover platform operating costs.
        </p>
        <br></br>

        <h2 style={{ fontSize: "18px", fontWeight: "bold"}}>7. Shipping and Delivery</h2>
        <p>
          Farmers are responsible for shipping the products to customers. All
          deliveries should be made within the time frame agreed upon at the
          time of purchase. Any disputes regarding delivery must be handled
          directly between the farmer and the customer.
        </p>
        <br></br>

        <h2 style={{ fontSize: "18px", fontWeight: "bold"}}>8. Returns and Refunds</h2>
        <p>
          If a customer receives a damaged or incorrect product, they must
          notify Kaca Bazar within 48 hours of delivery. Refunds and returns
          will be handled on a case-by-case basis and may depend on the nature
          of the product.
        </p>
        <br></br>

        <h2 style={{ fontSize: "18px", fontWeight: "bold"}}>9. Prohibited Activities</h2>
        <p>
          You may not use Kaca Bazar for any unlawful activities, including but
          not limited to fraud, selling illegal products, or infringing on
          others' intellectual property rights. Any violations may result in the
          termination of your account.
        </p>
        <br></br>

        <h2 style={{ fontSize: "18px", fontWeight: "bold"}}>10. Privacy Policy</h2>
        <p>
          Your privacy is important to us. Please refer to our Privacy Policy
          for more information on how we collect, use, and protect your personal
          data.
        </p>
        <br></br>

        <h2 style={{ fontSize: "18px", fontWeight: "bold"}}>11. Changes to the Terms</h2>
        <p>
          Kaca Bazar reserves the right to update these Terms and Conditions at
          any time. Any changes will be posted on our website, and it is your
          responsibility to review them periodically.
        </p>
        <br></br>

        <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "blue", cursor: "pointer"}} onClick={() => (window.location.href = "/contact")}>12. Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, please
          contact our support team at support@kacabazar.com.
        </p>
        <br></br>
      </div>
      <Footer />
    </>
  );
}

export default TermsAndConditions;
