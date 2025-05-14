/// <reference types="Cypress" />


describe("Airalo API Automation Suite", () => {
    let access_token = "";
    const packageId = "merhaba-7days-1gb";
  
    // Get Bearer Token once before all tests
    before(() => {
      cy.request({
        method: "POST",
        url: "https://sandbox-partners-api.airalo.com/v2/token",
        form: true,
        body: {
          client_id: "7e29e2facf83359855f746fc490443e6",
          client_secret: "e5NNajm6jNAzrWsKoAdr41WfDiMeS1l6IcGdhmbb",
          grant_type: "client_credentials",
        },
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        access_token = response.body.data.access_token;
        cy.log("Token acquired successfully");
      });
    });
  
    // CASE 2: Create an Order for 6 eSIMs
    it("CASE 2 - Create Order for 6 eSIMs", () => {
      cy.request({
        method: "POST",
        url: "https://sandbox-partners-api.airalo.com/v2/orders",
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
        form: true,
        body: {
          quantity: 6,
          package_id: packageId,
          type: "sim",
          description: "6 sim cards merhaba-7days-1gb Filip",
        },
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        cy.log("Order Response:", JSON.stringify(response.body));
  
        const order = response.body.data || response.body; 
        expect(order).to.have.property("id");
        expect(order.package_id).to.eq(packageId);
  
        cy.wrap(order.id).as("order_id");
      });
    });
  
    // CASE 3: Validate the 6 created eSIMs
    it("CASE 3 - Validate 6 eSIMs with correct package slug", () => {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0]; 
  
      cy.request({
        method: "GET",
        url: "https://sandbox-partners-api.airalo.com/v2/sims",
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
        qs: {
          include: "order,order.status,order.user",
          "filter[created_at]": `${formattedDate} - ${formattedDate}`,
          limit: 6,
          page: 1,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const sims = response.body.data;
        expect(sims.length).to.eq(6);
  
        sims.forEach((sim, index) => {
          cy.log(`SIM #${index + 1}: ${JSON.stringify(sim)}`);
        
          const actualPackageId = sim.simable?.package_id;
        
          expect(actualPackageId, `SIM ${index + 1} has correct package`).to.eq(packageId);
        });
        
      });
    });
  });
  