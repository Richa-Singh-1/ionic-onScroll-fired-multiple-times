import React, { useRef, useState } from 'react';
import { IonApp, IonButton, IonCol, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonRouterOutlet, IonRow, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import './App.css'

import '@ionic/react/css/core.css';

const App: React.FC = () => {
  const toolbarRef = useRef<HTMLIonTabBarElement>(null);
  const [previousScrollY, setScrollY] = useState(null);

  const onscroll = (offsetTop: any) => {
    console.log('onscroll', offsetTop);
    if (previousScrollY !== null) {
      if (offsetTop > previousScrollY) {
        if (toolbarRef?.current) {
          toolbarRef.current.style.display = "none";
        }
      }
      else if (offsetTop < previousScrollY) {
        if (toolbarRef?.current) {
          toolbarRef.current.style.display = "block";
        }
      }
    }

    setScrollY(offsetTop);
  }
  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar ref={toolbarRef}>
            <IonTitle>IONIC  ONSCROLL</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonButton color="primary">Button</IonButton>
            <IonButton color="primary">Button</IonButton>
            <IonButton color="primary">Button</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent
          scrollEvents={true}
          onIonScroll={(e) => onscroll(e.detail.scrollTop)}
        >
          <IonItem >
            <IonLabel className="text-sm mt-0 mb-0">
              <IonRow >
                <IonCol size="auto">Sub Header</IonCol>
              </IonRow>
            </IonLabel>
          </IonItem>
          <div>
            <div className="box">BOX</div>
            <div className="box">BOX</div>
            <div className="box">BOX</div>
            <div className="box">BOX</div>
            <div className="box">BOX</div>
            <div className="box">BOX</div>
            <div className="box">BOX</div>
            <div className="box">BOX</div>
            <div className="box">BOX</div>
            <div className="box">BOX</div>
            <div className="box">BOX</div>
            <div className="box">BOX</div>


          </div>

        </IonContent>
      </IonPage>
    </IonApp>
  );
};


export default App;
