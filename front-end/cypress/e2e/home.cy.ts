describe("Homepage", () => {
	it("shows the hero prompt and routes", () => {
		cy.visit("/");

		cy.contains("h1", "Search the claim. Read the bottom line. Open the nuance only if you need it.").should(
			"be.visible"
		);
		cy.contains("label", "Search a claim, headline, or topic").should("be.visible");
		cy.contains("button", "Search").should("be.visible");
		cy.contains("a", "Read the explainers").should("have.attr", "href", "/explainers");
		cy.contains("a", "Read the standards").should("have.attr", "href", "/standards");
	});
});
