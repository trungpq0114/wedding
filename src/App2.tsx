export function App2() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <iframe
        style={{ width: '100%', height: '100%', border: 'none' }}
        src='./test2.html'
        title='HTML Content'
      />
    </div>
  );
}
