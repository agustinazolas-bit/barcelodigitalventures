/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PresentationIntro } from './components/PresentationIntro';
import { HomePage } from './pages/HomePage';
import { LanguageProvider } from './context/LanguageContext';

function MainApp() {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  return (
    <>
      {/* 
        Presentation Intro Screen:
        Displays the official transparent brand logo, the purpose line, 
        and transitions to the main landing page with an elegant cinematic Fade-out.
      */}
      <PresentationIntro
        show={showIntro}
        onFinish={() => setShowIntro(false)}
      />

      <HomePage onReplayIntro={() => setShowIntro(true)} />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
