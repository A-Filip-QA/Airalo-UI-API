class AiraloHomePage {
    visit() {
      cy.visit("https://www.airalo.com/");
    }
  
    acceptCookies() {
      cy.get("#onetrust-accept-btn-handler").should("be.visible").click();
    }
  
    declinePushNotifications() {
      cy.get("#wzrk-cancel").should("be.visible").click({ force: true });
    }
  
    switchToEnglish() {
      cy.get('[data-testid="Mакедонски-header-language"]').click();
      cy.get('[data-testid="English-language"]').click();
    }
  
    searchForCountry(country) {
      //cy.get('[data-testid="search-input"]').type("Japan", { delay: 1000 });
  
      cy.get('[data-testid="search-input"]')
        .type("Japan", { delay: 100, force: true })
        .scrollIntoView({ offset: { top: 0, left: 0 }, behavior: "instant" });
    }
  
    selectCountry(country) {
      // cy.get('[data-testid="Japan-name"]').eq(0).click();
      cy.get(".countries-list")
        .find(".countries-search-segment")
        .contains("Local")
        .find('[data-testid="Japan-name"]')
        .should("be.visible")
        .click();
    }
  }
  
  class EsimDetailsPage {
    selectFirstEsimPackage() {
      cy.get('[data-testid="esim-button"]').eq(1).click();
    }
    verifyDetails() {
      cy.get('[data-testid="sim-detail-header"]').within(() => {
        cy.get('[data-testid="sim-detail-operator-title"]').should(
          "contain.text",
          "Moshi Moshi"
        );
  
        cy.get('[data-testid="COVERAGE-value"]').should("contain.text", "Japan");
  
        cy.get('[data-testid="DATA-value"]').should("contain.text", "1 GB");
  
        cy.get('[data-testid="VALIDITY-value"]').should("contain.text", "7 Days");
  
        cy.get('[data-testid="PRICE-value"]').should("contain.text", "$4.50");
      });
    }
  }
  
  const homePage = new AiraloHomePage();
  const esimPage = new EsimDetailsPage();
  
  describe("Airalo UI Automation: Japan eSIM", () => {
    it("should verify eSIM package details for Japan", () => {
      homePage.visit();
      homePage.acceptCookies();
      homePage.declinePushNotifications();
      homePage.switchToEnglish();
      homePage.searchForCountry("Japan");
      homePage.selectCountry("Japan");
  
      esimPage.selectFirstEsimPackage();
      esimPage.verifyDetails();
    });
  });