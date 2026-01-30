describe("Homepage", () => {
	it("shows the hero prompt and routes", () => {
		cy.visit("/");

		cy.contains("h1", "Is there consensus?").should("be.visible");
		cy.contains("button", "Summarize the video").should("be.visible");
		cy.contains("a", "Start a consensus check").should("have.attr", "href", "/ask");
		cy.contains("a", "See how it works").should("have.attr", "href", "/how");
	});
});
