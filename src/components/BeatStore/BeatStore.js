// BeatStore.component.js

import React, { useEffect } from 'react';

function BeatStore() {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []); 

    const frame = '<iframe src="https://player.beatstars.com/?storeId=116624" width="100%" height="800"> -- none -- </iframe>'
    return (
      <section id="rapbeats" className="rap-trap-section section text-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section-title">Beat Store</h2>
              <small>Tag removed upon purchase.</small>
              <div dangerouslySetInnerHTML={{__html: frame}} />
          	  {/* <AudioShop /> */}
            </div>
          </div>
        </div>
      </section>
    )
}

export default BeatStore;
