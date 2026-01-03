import "./App.css";

function App() {
  return (
    <div className="parallax-container">
      {/* Hero Section */}
      <section
        className="parallax-section hero"
        style={{
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="content">
          <h1>Parallax Website</h1>
          <p>Scroll down to see the parallax effect</p>
        </div>
      </section>

      {/* Section 1 */}
      <section className="regular-section">
        <div className="content">
          <h2>Section 1</h2>
          <p>This is a regular content section. Add your content here.</p>
        </div>
      </section>

      {/* Parallax Section 2 */}
      <section
        className="parallax-section"
        style={{
          backgroundImage: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        }}
      >
        <div className="content">
          <h2>Parallax Effect</h2>
          <p>This section moves at a different speed while scrolling</p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="regular-section">
        <div className="content">
          <h2>Section 2</h2>
          <p>Another regular content section with normal scrolling behavior.</p>
        </div>
      </section>

      {/* Parallax Section 3 */}
      <section
        className="parallax-section"
        style={{
          backgroundImage: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        }}
      >
        <div className="content">
          <h2>Final Parallax</h2>
          <p>Create more parallax sections as needed</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Parallax Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
