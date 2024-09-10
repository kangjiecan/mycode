import React from 'react';
export const campusAddresses = {
  " NSCC Bridgewater Campus": "75 High St, Bridgewater, Nova Scotia, Canada",
  " NSCC Halifax Campus": "5685 Leeds St, Halifax, Nova Scotia, Canada",
};

const Address = ({ campusName, address }) => {
  return (
    <div style={{ marginTop: '20px'}}>
      {campusName && <strong>{campusName}: </strong>}
      {address}
    </div>
  );
};

export default Address;

