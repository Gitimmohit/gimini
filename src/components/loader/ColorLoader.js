import React from 'react'
import { ColorRing } from 'react-loader-spinner';

function ColorLoader({ backgroundColor="rgba(0, 0, 0, 0.5)" , size=160, colors=["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"],position="fixed" ,top="50%", left="50%"}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: position,
        top: top,
        left: left,
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        backgroundColor: backgroundColor,
        zIndex: "999",
      }}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <div className="loader-container">
        <ColorRing
          visible={true}
          height={size}
          width={size}
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={colors}
        />
      </div>
    </div>
  
  )
}

export default ColorLoader

// ==========================
// import React from 'react';
// import { ColorRing } from 'react-loader-spinner';

// function ColorLoader({ backgroundColor , size, colors}) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: "100%",
//         height: "100%",
//         backgroundColor: backgroundColor,
//         zIndex: "999",
//       }}
//       aria-labelledby="contained-modal-title-vcenter"
//     >
//       <div className="loader-container">
//         <ColorRing
//           visible={true}
//           height={size}
//           width={size}
//           ariaLabel="blocks-loading"
//           wrapperStyle={{}}
//           wrapperClass="blocks-wrapper"
//           colors={colors}
//         />
//       </div>
//     </div>
//   );
// }

// export default ColorLoader;
