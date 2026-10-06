function App() {
  return (
    <main className="shell">
      <p className="eyebrow">ClariFlow</p>
      <h1>A clear place to start.</h1>
      <p className="intro">
        Your frontend is ready. Connect it to the backend at{" "}
        <code>http://localhost:4000</code>.
      </p>
      <div className="status">
        <span className="status-dot" aria-hidden="true" />
        API workspace initialized
      </div>
    </main>
  );
}

export default App;
