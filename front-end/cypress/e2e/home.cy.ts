describe("Homepage", () => {
	it("shows the name input and action button", () => {
		cy.visit("/");

		cy.get("#input").should("be.visible").and("have.attr", "placeholder", "What's your name?");
		cy.contains("button", "GO").should("be.visible");
	});

	it("renders the primary logos", () => {
		cy.visit("/");

		cy.contains("span", "Nuxt 4").should("be.visible");
		cy.contains("span", "Vitesse").should("be.visible");
	});
});
