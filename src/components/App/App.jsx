import React, { useState } from 'react';
import baseBallData from '../../../public/data.js';

export default function App() {
  const [baseBallData, setBaseBallData] = useState(baseBallData);
  return <h1>Hello World</h1>;
}
