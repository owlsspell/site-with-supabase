export default function getIconCategory(name: string, width = 24, height = 24) {
  const blue = '#3659e3'
  switch (name) {
    case "Business":
      return (
        <svg width={width} height={height} fill={blue} viewBox="0 0 32 33">
          <g id="buisness-profession_svg__icon_selection">
            <path
              id="buisness-profession_svg__primary_fill"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.002 5.936L15 6.01v.493h2V6.01l-.002-.073a1 1 0 00-1.996 0zM18 6.502h9.5a.5.5 0 010 1H27v16h.5a.5.5 0 110 1h-3.172l.046.046.006.005.006.007.067.072.011.012a2 2 0 01-2.833 2.813l-.01-.01-.065-.06-.006-.007-.004-.003-2.875-2.875H13.41l-2.873 2.874-.01.01-.065.061-.01.01a2 2 0 01-2.834-2.813l.011-.012.068-.072.011-.012.046-.046H4.5a.5.5 0 010-1H5v-16h-.5a.5.5 0 010-1H14v-.514l.003-.089v-.014a2 2 0 013.994 0v.014l.003.089v.514zm-12 1v16h20v-16H6zm16.914 17h-2.828l2.162 2.162.053.05a1 1 0 001.416-1.405l-.055-.06-.748-.747zm-10.919 0H9.167l-.747.747-.056.06a1 1 0 001.416 1.405l.054-.05 2.161-2.162zM8.145 9.65a.5.5 0 01.355-.147h6a.5.5 0 01.5.496l.04 5.5a.5.5 0 11-1 .008l-.036-5.004H9.002l.036 10h5.002v-2a.5.5 0 111 0v2.5a.5.5 0 01-.5.5h-6a.5.5 0 01-.5-.498l-.04-11a.5.5 0 01.146-.355zM17 18.002a.5.5 0 100 1h6.5a.5.5 0 000-1H17zm-.5-2.5a.5.5 0 01.5-.5h5.5a.5.5 0 110 1H17a.5.5 0 01-.5-.5zm.5-3.5a.5.5 0 100 1h6.5a.5.5 0 000-1H17z"
              fill={blue}
            ></path>
          </g>
        </svg>
      );
    case "Food & Drink":
      return (
        <svg width={width} height={height} fill={blue} viewBox="0 0 40 41"><g id="food-drink_svg__icon_selection"><path id="food-drink_svg__primary_fill" fillRule="evenodd" clipRule="evenodd" d="M26.76 5.014a.625.625 0 01.721.462l1.444 5.777h5.45a.625.625 0 01.623.67l-1.659 22.5a.625.625 0 01-.623.58H21.66a.625.625 0 01-.624-.58l-.033-.457-.23.085c-1.667.595-3.928.951-6.397.951-2.468 0-4.73-.356-6.397-.951-.831-.297-1.548-.665-2.068-1.105C5.392 32.51 5 31.94 5 31.252c0-.528.234-.99.575-1.37l8.234-17.644a.625.625 0 011.132 0l5.295 11.345-.86-11.66a.625.625 0 01.624-.67h7.637L26.41 6.35l-9.42 1.766a.625.625 0 11-.231-1.228l10-1.875zm1.19 7.489h-7.277l.23 3.125H22.5a.625.625 0 110 1.25h-1.505l.72 9.768a.629.629 0 010 .104l1.461 3.133c.341.38.574.842.574 1.37 0 .686-.392 1.256-.91 1.693a4.752 4.752 0 01-.628.443l.027.363h9.896l1.245-16.874h-7.13a.625.625 0 110-1.25h2.48l-.78-3.125zm5.752 0l-.23 3.125H30c0-.05-.006-.101-.019-.152l-.743-2.973h4.464zM7.275 29.195L6.666 30.5a.626.626 0 01-.116.17c-.234.241-.3.437-.3.583 0 .177.098.429.466.74.365.307.93.613 1.682.881 1.5.536 3.613.88 5.977.88 2.364 0 4.477-.344 5.977-.88.753-.268 1.317-.574 1.682-.882.368-.31.466-.562.466-.739 0-.146-.066-.341-.299-.583a.625.625 0 01-.116-.17l-1.24-2.656a3.765 3.765 0 01-2.55.13 3.765 3.765 0 01-.631-6.946l-3.289-7.046-.626 1.341a3.763 3.763 0 01-3.046 6.526l-.932 1.999a3.77 3.77 0 012.778.418 3.763 3.763 0 11-5.274 4.93zm.857-1.838a2.514 2.514 0 002.508 2.664 2.512 2.512 0 10-1.727-4.336l-.78 1.672zm10.062-5.195l2.121 4.546a2.503 2.503 0 01-1.656.068 2.513 2.513 0 01-.465-4.614zm-6.924-1.527a2.512 2.512 0 001.913-4.1l-1.913 4.1z" fill={blue}></path></g></svg>
      );
    case "Health":
      return (
        <svg width={width} height={height} fill={blue} viewBox="0 0 32 32"><path fillRule="evenodd" clipRule="evenodd" d="M8.75 5a.75.75 0 00-.75.75v.833a.75.75 0 101.5 0V5.75A.75.75 0 008.75 5zM7 5.75a1.75 1.75 0 113.5 0v.833a1.75 1.75 0 01-3.45.415A.506.506 0 017 7a1 1 0 00-.999.997l.017.088c.016.079.04.184.074.316.067.263.163.613.28 1.023.233.819.544 1.86.856 2.888A473.596 473.596 0 008.368 16h1.36a.5.5 0 01.5.5c0 1.15.837 2 1.772 2s1.773-.85 1.773-2a.5.5 0 01.5-.5h1.36a608.16 608.16 0 001.139-3.688c.312-1.027.623-2.07.857-2.888.116-.41.212-.76.279-1.023a7.927 7.927 0 00.09-.404L18 7.99A1 1 0 0017 7c-.017 0-.033 0-.05-.002a1.75 1.75 0 01-3.45-.415V5.75a1.75 1.75 0 113.5 0V6a2 2 0 012 2c0 .093-.021.205-.038.288-.02.099-.05.22-.085.358-.07.278-.17.639-.287 1.052-.235.827-.549 1.876-.862 2.904A474.015 474.015 0 0116.68 16H17a.5.5 0 01.5.5 5.5 5.5 0 01-4.98 5.476C12.75 24.807 15.02 27 17.75 27c2.88 0 5.25-2.442 5.25-5.5v-1.035a3.501 3.501 0 111 0V21.5c0 3.57-2.778 6.5-6.25 6.5-3.315 0-5.998-2.672-6.233-6.02A5.5 5.5 0 016.5 16.5.5.5 0 017 16h.32a495.395 495.395 0 01-1.048-3.398 183.988 183.988 0 01-.862-2.904 38.924 38.924 0 01-.287-1.052 8.747 8.747 0 01-.085-.358A1.534 1.534 0 015 8a2 2 0 012-2v-.25zM16.473 17a4.5 4.5 0 01-8.946 0h.461a.45.45 0 00.023 0h1.255c.218 1.388 1.325 2.5 2.734 2.5 1.41 0 2.516-1.112 2.734-2.5H16.472zM26 17a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM15.25 5a.75.75 0 00-.75.75v.833a.75.75 0 001.5 0V5.75a.75.75 0 00-.75-.75zm7.998 11.568a.5.5 0 10-.504-.864 1.5 1.5 0 102.049 2.057.5.5 0 10-.862-.508.5.5 0 11-.683-.685z" fill={blue}></path></svg>);
    case "Music":
      return (
        <svg width={width} height={height} id="music-note_svg__eds-icon--music-note_svg" x="0" y="0" viewBox="0 0 24 24"><path id="music-note_svg__eds-icon--music-note_base" fillRule="evenodd" fill={blue} clipRule="evenodd" d="M21 2L8 5.5v11.3c-.5-.5-1.2-.8-2-.8-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3V9.5l11-3v7.2c-.5-.5-1.2-.8-2-.8-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3V2zM6 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8.5V6.2l11-3v2.3l-11 3zm9 9.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg>)
    case "Auto, Boat & Air":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" fill={blue} d="M22 10h-3V4H5v6H2v1h1.3c-.2.3-.3.6-.3 1v6h1v1c0 1.1.9 2 2 2s2-.9 2-2v-1h8v1c0 1.1.9 2 2 2s2-.9 2-2v-1h1v-6c0-.4-.1-.7-.3-1H22v-1zM6 5h12v5h-5.5V7h-1v3H6V5zm1 14c0 .6-.4 1-1 1s-1-.4-1-1v-1h2v1zm12 0c0 .6-.4 1-1 1s-1-.4-1-1v-1h2v1zm1-2H4v-5c0-.6.4-1 .9-1h14c.6 0 1.1.4 1.1 1v5z"></path><g fillRule="evenodd" clipRule="evenodd" fill={blue}><path d="M17 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1c0 .5-.4 1-1 1zM7 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1c0 .5-.5 1-1 1z"></path></g><path fillRule="evenodd" clipRule="evenodd" fill={blue} d="M11 13h2v1h-2z"></path></svg>)
    case "Charity & Causes":
      return (
        <svg width={width} height={height} id="charity_svg__eds-icon--charity_svg" x="0" y="0" viewBox="0 0 24 24" ><path id="charity_svg__eds-icon--charity_base" fillRule="evenodd" clipRule="evenodd" fill={blue} d="M5.8 21.9l-.7-.7 2.4-2.6c3.1-3.3 7.9-8.3 9.3-9.9 1-1.1 1.4-2.3 1.1-3.6-.4-1.5-1.8-2.2-3-2.2-1.1 0-2.1.6-2.5 1.5l-.4.7-.4-.6c-1-1.5-2.8-1.9-4.3-1.1C6.5 4 6 4.9 5.9 5.8c0 1.1.3 2 1.2 2.9l3.8 4-.7.7-3.8-4C5.4 8.3 4.9 7.2 5 5.8c.1-1.3.8-2.5 1.9-3.2 1.7-1 3.7-.6 5.1.8.7-.9 1.8-1.4 3-1.4 1.9 0 3.5 1.2 3.9 2.9.4 1.6 0 3.2-1.3 4.5-1.6 1.6-6.3 6.6-9.4 10l-2.4 2.5z"></path><path id="charity_svg__eds-icon--charity_line" fillRule="evenodd" clipRule="evenodd" fill={blue} d="M18.3 22l-5.1-5.4.6-.7 5.1 5.4z"></path></svg>)
    case "Community":
      return (
        <svg width={width} height={height} id="park_svg__eds-icon--park_svg" x="0" y="0" viewBox="0 0 24 24" ><path id="park_svg__eds-icon--park_base" fillRule="evenodd" clipRule="evenodd" d="M22 18.5h-3V17h2v-4H10.7c.5-1.1.5-2.3 0-3.6L6.5 2 2.4 9.5c-1.3 2.8.7 6 3.7 6.3V22h1v-6.3c.7-.1 1.4-.3 2-.7v2h2v1.5H8v1h1V22h1v-2.5h10V22h1v-2.5h1v-1zM7 14.7V10H6v2l-1.4-1.4-.7.7L6 13.4v1.3c-1-.1-1.9-.7-2.5-1.6-.7-1-.8-2.2-.3-3.3L6.4 4l3.2 5.8c.5 1.1.4 2.3-.3 3.3-.4.9-1.3 1.5-2.3 1.6zm3-.6l.1-.1H20v2H10v-1.9zm2 4.4h6V17h-6v1.5z" fill={blue}></path></svg>)
    case "Family & Education":
      return (
        <svg width={width} height={height} id="rocking-horse_svg__eds-icon--rocking-horse_svg" x="0" y="0" viewBox="0 0 24 24" ><path id="rocking-horse_svg__eds-icon--rocking-horse_base" fillRule="evenodd" clipRule="evenodd" d="M21 17.3l-.7.7L18 9.1c0-.2 0-.4.1-.5.2-.2.6-.3.8-.1l.2.2c.6.5 1.6.4 2.1-.1s.6-1.4.2-2l-3-4.5-1.4 2c-2.1.1-3.8 1.9-3.8 4.1 0 .2 0 .5.1.8H4.1v1H6l-2.1 8c-.3-.2-.6-.5-.8-.8l-.8.8c2.7 2.7 6.2 4 9.7 4 3.5 0 7-1.3 9.7-4l-.7-.7zM17.3 5.1h.3l.9-1.3L20.6 7c.2.2.1.6-.1.8-.2.2-.6.2-.8 0l-.2-.2c-.3-.2-.6-.4-1-.4-.5 0-.9.2-1.2.6-.3.4-.4.9-.3 1.4l1.9 7.2c-2.2-2.2-4.6-2.7-6.3-2.7h-.4v-.8c1.4-.3 2.5-1.6 2.5-3l-.2-.7c-.1-.3-.2-.8-.2-1.2-.1-1.5 1.3-2.9 3-2.9zM13.6 10c0 1.2-.9 2.1-2.1 2.1-1.2 0-2.1-1-2.1-2.1h4.2zm-8.2 6.2L7 10h1.3c0 1.6 1.2 2.9 2.8 3.1v.8c-2.6.4-4.6 1.7-5.8 2.8l.1-.5zm-.7 2.5c.5-.7 3-3.6 7.1-3.9h.7c2.7 0 5 1.3 6.8 3.8l.1.1c-4.4 3.1-10.3 3.1-14.7 0z" fill={blue}></path></svg>)
    case "Fashion":
      return (
        <svg width={width} height={height} id="fashion_svg__eds-icon--fashion_svg" x="0" y="0" viewBox="0 0 24 24" ><path id="fashion_svg__eds-icon--fashion_base" fillRule="evenodd" clipRule="evenodd" fill={blue} d="M24 15.1l-11.5-4.3v-.9c1.1-.2 2-1.2 2-2.4C14.5 6.1 13.4 5 12 5S9.5 6.1 9.5 7.5h1c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5S12.8 9 12 9h-.5v1.8L0 15.1l.3.9 1.7-.6V18h5v1h1v-1h8v1h1v-1h5v-2.6l1.7.6.3-.9zM21 17h-4v-1h-1v1H8v-1H7v1H3v-1.9l9-3.3 9 3.3V17z"></path></svg>)
    case "Film & Media":
      return (
        <svg width={width} height={height} fill={blue} viewBox="0 0 32 32"><path fillRule="evenodd" clipRule="evenodd" d="M25.887 4.013a.5.5 0 01.598.366l1 4a.5.5 0 01-.372.608L9.857 13H27.5a.5.5 0 01.5.5v14a.5.5 0 01-.5.5h-22a.5.5 0 01-.5-.5V13.57l-.985-3.949a.5.5 0 01.372-.608l1.196-.278a.503.503 0 01.2-.047l4.72-1.097a.502.502 0 01.1-.023l15.284-3.555zM5.718 9.73l-.61.142.756 3.03 3.606-.838L5.718 9.73zm5.13 2.013L7.096 9.41l3.484-.81 3.752 2.333-3.484.81zm8.346-1.94l-3.484.81-3.752-2.334 3.484-.81 3.752 2.333zM6 18h1a.499.499 0 00.355-.148L11.223 14h3.583l-3.012 3H10.5a.5.5 0 000 1H27v9H6v-9zm7.21-1h3.584l3.012-3h-3.583l-3.012 3zm8.584 0H18.21l3.012-3h3.583l-3.012 3zm1.417 0H27v-3h-.777l-3.012 3zM6 17h.793l3.013-3H6v3zm10.82-9.852l3.485-.81 3.751 2.333-3.484.81-3.752-2.333zm8.614 1.203l-3.751-2.334 3.951-.918.758 3.03-.957.222zM8 20.5a.5.5 0 01.5-.5h16a.5.5 0 010 1h-16a.5.5 0 01-.5-.5zm.5 2.5a.5.5 0 000 1h16a.5.5 0 100-1h-16z" fill={blue}></path></svg>)
    case "Hobbies":
      return (
        <svg width={width} height={height} fill={blue} viewBox="0 0 32 32"><path fillRule="evenodd" clipRule="evenodd" d="M19.004 4a.5.5 0 110 1h-.5A2.003 2.003 0 0016.5 7.003V9a.508.508 0 01-.004.062A2 2 0 0118 11h2a5.501 5.501 0 015.455 4.792c.009.02.016.04.023.06l2.29 7.39c.06.16.11.324.148.493l.003.014.03.155.002.009v.004a3.5 3.5 0 01-6.384 2.494c-.083-.127-1.03-1.599-2.84-4.411h-5.454c-1.81 2.814-2.76 4.289-2.845 4.418a3.5 3.5 0 01-6.189-3.192l2.283-7.374a.512.512 0 01.023-.06A5.501 5.501 0 0112 11h2a2 2 0 011.504-1.938A.508.508 0 0115.5 9V7.003A3.003 3.003 0 0118.503 4h.5zM16 10a1 1 0 011 1h-2a1 1 0 011-1zm-8.5 6.5A4.5 4.5 0 0112 12h8a4.5 4.5 0 013.887 6.77.5.5 0 10.863.505c.177-.303.326-.624.444-.96l1.623 5.24a2.465 2.465 0 01.122.392l.027.142a2.5 2.5 0 01-4.562 1.776L19.917 22H20c.797 0 1.556-.17 2.241-.476a.5.5 0 10-.408-.913c-.559.25-1.18.389-1.833.389h-8a4.5 4.5 0 01-4.5-4.5zm4.584 5.5H12a5.502 5.502 0 01-5.193-3.685L5.189 23.54a2.492 2.492 0 00-.19.96 2.5 2.5 0 004.593 1.37c.076-.116.906-1.404 2.492-3.869zm7.416-8.5a1 1 0 100 2 1 1 0 000-2zm-1 5a1 1 0 112 0 1 1 0 01-2 0zm3-3a1 1 0 100 2 1 1 0 000-2zm-5 1a1 1 0 112 0 1 1 0 01-2 0zm-5-2.5a.5.5 0 01.5.5V16h1.5a.5.5 0 010 1H12v1.5a.5.5 0 01-1 0V17H9.5a.5.5 0 110-1H11v-1.5a.5.5 0 01.5-.5z" fill={blue}></path></svg>)
    case "Home & Lifestyle":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24"><path fill={blue} fillRule="evenodd" clipRule="evenodd" d="M4 9.9V22h6v-6h4v6h6V9.9l1.3 1 .7-.8L12 2 2 10.2l.6.8L4 9.9zm15-.8V21h-4v-6H9v6H5V9.1l7-5.6 7 5.6z"></path></svg>)
    case "Performing & Visual Arts":
      return (
        <svg width={width} height={height} fill={blue} viewBox="0 0 40 41"><path fillRule="evenodd" clipRule="evenodd" d="M5.625 5.002a.625.625 0 00-.623.67l.992 13.75a.632.632 0 00.006.056c.214 4.119 3.598 7.4 7.75 7.4a7.69 7.69 0 004.588-1.512l.16 2.173c.181 4.149 3.578 7.463 7.752 7.463 4.174 0 7.571-3.314 7.754-7.464l.994-13.74a.625.625 0 00-.623-.67h-.206a.62.62 0 00-.12.01c-1.894.374-4.678.614-7.799.614-1.544 0-3.009-.059-4.325-.164l.573-7.916a.625.625 0 00-.623-.67h-.206a.626.626 0 00-.12.012c-1.894.373-4.678.613-7.799.613-3.121 0-5.905-.24-7.798-.613a.625.625 0 00-.121-.012h-.206zm16.21 9.833l-.331 4.578a7.815 7.815 0 01-1.991 4.884l.232 3.16v.02c.15 3.494 3.009 6.275 6.505 6.275s6.355-2.78 6.505-6.277v-.008l.001-.01.94-12.983c-1.953.33-4.576.528-7.446.528-1.571 0-3.065-.06-4.415-.167zM13.75 6.877c-2.87 0-5.493-.199-7.446-.528l.932 12.913c.005.029.009.059.01.09.149 3.494 3.008 6.275 6.504 6.275 3.496 0 6.355-2.78 6.505-6.277l.001-.018.94-12.983c-1.953.33-4.576.528-7.446.528z" fill={blue}></path><path d="M15.148 11.062h.003l.014-.004a5.129 5.129 0 01.293-.076c.2-.047.477-.106.787-.152.653-.097 1.32-.115 1.734.04.33.123.624.325.842.51a3.45 3.45 0 01.308.292l.013.014.001.002a.625.625 0 00.953-.809l-.477.404.477-.404-.002-.002-.001-.001-.002-.002-.008-.01a3.204 3.204 0 00-.12-.13 4.746 4.746 0 00-.337-.311 4.195 4.195 0 00-1.21-.725c-.738-.275-1.684-.204-2.355-.104a10.768 10.768 0 00-1.235.26l-.02.006-.007.002h-.002s-.001.001.172.59l-.172-.59a.626.626 0 00.351 1.2zM24.783 19.163a.625.625 0 00.49-1.15l-.245.575.246-.575h-.002l-.002-.002-.008-.002-.022-.01a5.257 5.257 0 00-.343-.121 6.967 6.967 0 00-.93-.223c-.765-.13-1.82-.18-2.918.175a.625.625 0 10.384 1.19c.845-.273 1.684-.241 2.326-.133a5.709 5.709 0 01.966.253l.048.019.01.004zM33.437 19.689c-1.099-.42-2.234-.802-3.308-.764-.337.012-.61.094-.821.234-.206.136-.39.35-.516.695-.263.719-.268 1.992.39 4.07.03.1.07.206.12.337l.076.204c.079.214.166.467.224.727.107.486.159 1.238-.468 1.746-.688.557-1.547.31-2.013.116a4.535 4.535 0 01-.904-.512l-.017-.013-.005-.004-.002-.001-.001-.001.357-.468-.357.468a.625.625 0 01.758-.994s.001.001-.379.497l.38-.496.007.005a2.295 2.295 0 00.175.118c.124.078.29.172.47.248.423.176.648.143.743.066.041-.033.12-.122.035-.505a4.523 4.523 0 00-.176-.566l-.059-.157c-.055-.147-.114-.305-.157-.438-.684-2.161-.778-3.764-.37-4.877.209-.572.55-1.011.999-1.308.443-.293.953-.422 1.467-.44 1.357-.048 2.71.43 3.798.845a.625.625 0 01-.446 1.168zM28.066 30.276a.625.625 0 00-.027-.884c-1.541-1.45-3.365-1.555-4.997-1.16a.625.625 0 00.294 1.215c1.369-.331 2.708-.216 3.847.855a.625.625 0 00.883-.026zM9.871 10.8c-1.082-.038-2.306.277-3.298.712a.625.625 0 11-.502-1.145c1.106-.484 2.52-.863 3.844-.816.514.018 1.024.147 1.467.44.448.297.79.736 1 1.308.407 1.113.313 2.716-.371 4.877-.042.133-.102.29-.157.437l-.059.158a4.523 4.523 0 00-.177.566c-.084.383-.006.471.035.505.096.077.321.11.744-.066a3.285 3.285 0 00.645-.366l.007-.005a.626.626 0 01.76.993l-.38-.497.38.497-.003.002-.006.004-.017.013a3.585 3.585 0 01-.25.17c-.161.1-.39.232-.654.342-.466.195-1.326.44-2.013-.116-.627-.508-.575-1.26-.468-1.746.058-.26.145-.513.224-.727l.076-.204c.049-.13.09-.237.12-.337.658-2.077.653-3.351.39-4.07-.126-.344-.31-.56-.516-.695-.211-.14-.484-.222-.821-.234zM16.62 20.41a.625.625 0 10-.857-.91c-1.138 1.071-2.478 1.187-3.847.855a.625.625 0 10-.294 1.215c1.632.395 3.456.291 4.997-1.16zM23.714 20.628a.977.977 0 011.004.95.977.977 0 01-.935 1.018c-.562.02-.983-.436-1.001-.95-.018-.514.37-.999.932-1.018z" fill={blue}></path><path d="M31.214 20.628a.977.977 0 011.004.95.977.977 0 01-.935 1.018c-.562.02-.983-.436-1.001-.95-.018-.514.37-.999.932-1.018zM16.286 12.503a.977.977 0 00-1.004.95.977.977 0 00.935 1.019c.562.02.983-.437 1.001-.951.018-.514-.37-.999-.932-1.018zM8.786 12.503a.977.977 0 00-1.004.95.977.977 0 00.935 1.019c.562.02.983-.437 1.001-.951.018-.514-.37-.999-.932-1.018z" fill={blue}></path></svg>)
    case "Government":
      return (
        <svg width={width} height={height} id="megaphone_svg__eds-icon--megaphone_svg" x="0" y="0" viewBox="0 0 24 24"><path id="megaphone_svg__eds-icon--megaphone_base" fillRule="evenodd" clipRule="evenodd" fill={blue} d="M21 12c0-1.7-1.5-3.1-3-3.1V3h-1v1.1L7 9H3v6h2v3h1v-3h1.2l9.8 4.8V21h1v-5.9c1.5 0 3-1.4 3-3.1zM4 14h3v-4H4v4zm13 4.7l-9-4.4V9.6l9-4.4v13.5zm1-4.6V9.9c1 0 2 1 2 2.1 0 1.2-1 2.1-2 2.1z"></path></svg>)
    case "Spirituality":
      return (
        <svg width={width} height={height} id="religion_svg__eds-icon--politics_svg" x="0" y="0" viewBox="0 0 24 24" ><path fill={blue} id="religion_svg__eds-icon--religion_base" fillRule="evenodd" clipRule="evenodd" d="M10.8 13.9l-.2-.6-.6-.2L5.8 12l4.3-1.2.6-.1.2-.6L12 5.8l1.2 4.3.1.6.6.1 4.3 1.2-4.3 1.2-.6.2-.1.6-1.2 4.2-1.2-4.3zM12 2L9.9 9.9 2 12l7.9 2.1L12 22l2.1-7.9L22 12l-7.9-2.1L12 2z"></path><g id="religion_svg__eds-icon--religion_dashes" fillRule="evenodd" clipRule="evenodd"><path transform="rotate(-45.001 6.64 17.312)" d="M5.8 16.9h1.7v.8H5.8z"></path><path transform="rotate(-44.988 17.31 17.36)" d="M16.9 16.5h.8v1.7h-.8z"></path><path transform="rotate(-45.001 17.336 6.664)" d="M16.5 6.2h1.7V7h-1.7z"></path><path transform="rotate(-44.988 6.64 6.688)" d="M6.2 5.9H7v1.7h-.8z"></path></g></svg>)
    case "School Activities":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24"><path fill={blue} fillRule="evenodd" clipRule="evenodd" d="M20 2H4v20h15v-3h1V2zm-2 19H5.2c.4-1.2 1.5-2 2.8-2h10v2zm1-3H8c-1.2 0-2.3.5-3 1.4V3h14v15z"></path><path fill={blue} fillRule="evenodd" clipRule="evenodd" d="M8 13h8v1H8z"></path><path fill={blue} fillRule="evenodd" clipRule="evenodd" d="M8 10h8v1H8z"></path><path fill={blue} fillRule="evenodd" clipRule="evenodd" d="M8 7h8v1H8z"></path></svg>)
    case "Science & Tech":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24"><path fill={blue} fillRule="evenodd" clipRule="evenodd" d="M14 7.3V4h1V3H9v1h1v3.3c-2.9.9-5 3.5-5 6.7 0 3.9 3.1 7 7 7s7-3.1 7-7c0-3.2-2.1-5.8-5-6.7zM12 20c-2.7 0-5-1.8-5.8-4.3h11.5c-.7 2.5-3 4.3-5.7 4.3zm-6-5.4V14v-.4h2v-1.1H6.2c.1-.4.2-.7.4-1.1h1.5v-1.1h-.9c.8-.9 1.8-1.7 3.1-2L11 8V4h2v4l.7.2C16.2 9 18 11.4 18 14v.6H6z"></path></svg>)
    case "Holidays":
      return (
        <svg width={width} height={height} fill={blue} viewBox="0 0 28 36"><path fillRule="evenodd" clipRule="evenodd" d="M7.676 0a.75.75 0 01.75.75v.75h12V.75a.75.75 0 011.5 0v.75h5.25a.75.75 0 01.75.75v33a.75.75 0 01-.75.75h-25.5a.75.75 0 01-.75-.75v-33a.75.75 0 01.75-.75h5.25V.75a.75.75 0 01.75-.75zm-.75 3.75V3h-4.5v6h3.75a.75.75 0 010 1.5h-3.75v24h24v-24h-15.75a.75.75 0 010-1.5h15.75V3h-4.5v.75a.75.75 0 01-1.5 0V3h-12v.75a.75.75 0 01-1.5 0zM5.76 26.17a.75.75 0 11-.67-1.34l1.5-.75a.75.75 0 01.67 1.34l-1.5.75zm3.634-9.14l-1.5-1.5a.75.75 0 111.061-1.06l1.5 1.5a.75.75 0 11-1.06 1.06zm13.695 9.14a.75.75 0 10.671-1.34l-1.5-.75a.75.75 0 10-.67 1.34l1.5.75zm-4.695-9.14a.75.75 0 001.061 0l1.5-1.5a.75.75 0 10-1.06-1.06l-1.5 1.5a.75.75 0 000 1.06zm-4.72 15.22a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5zm-8.92-13.085a.75.75 0 011.006-.336l1.5.75a.75.75 0 11-.67 1.342l-1.5-.75a.75.75 0 01-.336-1.006zm3.14 10.305l1.5-1.5a.75.75 0 011.061 1.06l-1.5 1.5a.75.75 0 01-1.06-1.06zm16.202-10.305a.75.75 0 00-1.007-.336l-1.5.75a.75.75 0 10.671 1.342l1.5-.75a.75.75 0 00.336-1.006zm-4.64 8.805a.75.75 0 10-1.062 1.06l1.5 1.5a.75.75 0 101.061-1.06l-1.5-1.5zM14.425 12a.75.75 0 00-.75.75v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 00-.75-.75zm-3.75 10.5a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zm3.75-5.25a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" fill={blue}></path></svg>)
    case "Sports & Fitness":
      return (
        <svg width={width} height={height} fill={blue} viewBox="0 0 28 36"><path fillRule="evenodd" clipRule="evenodd" d="M7.676 0a.75.75 0 01.75.75v.75h12V.75a.75.75 0 011.5 0v.75h5.25a.75.75 0 01.75.75v33a.75.75 0 01-.75.75h-25.5a.75.75 0 01-.75-.75v-33a.75.75 0 01.75-.75h5.25V.75a.75.75 0 01.75-.75zm-.75 3.75V3h-4.5v6h3.75a.75.75 0 010 1.5h-3.75v24h24v-24h-15.75a.75.75 0 010-1.5h15.75V3h-4.5v.75a.75.75 0 01-1.5 0V3h-12v.75a.75.75 0 01-1.5 0zM5.76 26.17a.75.75 0 11-.67-1.34l1.5-.75a.75.75 0 01.67 1.34l-1.5.75zm3.634-9.14l-1.5-1.5a.75.75 0 111.061-1.06l1.5 1.5a.75.75 0 11-1.06 1.06zm13.695 9.14a.75.75 0 10.671-1.34l-1.5-.75a.75.75 0 10-.67 1.34l1.5.75zm-4.695-9.14a.75.75 0 001.061 0l1.5-1.5a.75.75 0 10-1.06-1.06l-1.5 1.5a.75.75 0 000 1.06zm-4.72 15.22a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5zm-8.92-13.085a.75.75 0 011.006-.336l1.5.75a.75.75 0 11-.67 1.342l-1.5-.75a.75.75 0 01-.336-1.006zm3.14 10.305l1.5-1.5a.75.75 0 011.061 1.06l-1.5 1.5a.75.75 0 01-1.06-1.06zm16.202-10.305a.75.75 0 00-1.007-.336l-1.5.75a.75.75 0 10.671 1.342l1.5-.75a.75.75 0 00.336-1.006zm-4.64 8.805a.75.75 0 10-1.062 1.06l1.5 1.5a.75.75 0 101.061-1.06l-1.5-1.5zM14.425 12a.75.75 0 00-.75.75v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 00-.75-.75zm-3.75 10.5a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zm3.75-5.25a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" fill={blue}></path></svg>)
    case "Travel & Outdoor":
      return (
        <svg width={width} height={height} id="travel_svg__eds-icon--travel_svg" x="0" y="0" viewBox="0 0 24 24"><path id="travel_svg__eds-icon--travel_base" fillRule="evenodd" clipRule="evenodd" fill={blue} d="M12.5 10.4l1-1 1 1V13h-2v-2.6zM4 21h2V6H4v15zm11.5-7v-4L14 8.5V6h3v15H7V6h6v2.4L11.5 10v4h4zm2.5 7h2V6h-2v15zM9 5h6V3H9v2zM8 2v3H3v17h18V5h-5V2H8z"></path></svg>)
    case "Sports & Fitness":
      return (
        <svg width={width} height={height} fill={blue} viewBox="0 0 32 32"><path fillRule="evenodd" clipRule="evenodd" d="M18.034 9.61a4.49 4.49 0 00-.875-3.54 4.986 4.986 0 013.96-.994 4.987 4.987 0 013.38 2.289 4.488 4.488 0 00-2.033 3.026 4.49 4.49 0 00.875 3.539 5.03 5.03 0 01-.981.604 1.998 1.998 0 00-3.039.38 4.986 4.986 0 01-3.32-2.279 4.48 4.48 0 002.034-3.026zm-1.926-3.952l.002-.001a5.992 5.992 0 015.182-1.566A5.991 5.991 0 0125.6 7.284c.01.016.02.032.028.05a5.975 5.975 0 01.534 3.708 5.967 5.967 0 01-1.804 3.332 6.027 6.027 0 01-1.455 1.008c.063.195.097.402.097.618v.268A2 2 0 0126 18v1h.014l.089.003h.014A2 2 0 0126 23v1a2 2 0 01-3 1.733V26a2 2 0 01-4 0v-3h-6v3a2 2 0 01-4 0v-.267A2 2 0 016 24v-1h-.014l-.089-.003h-.014a2 2 0 010-3.994h.014L5.986 19H6v-1a2 2 0 013-1.732V16a2 2 0 014 0v3h6v-3c0-.044.001-.088.004-.13a5.993 5.993 0 01-4.132-3.208 5.945 5.945 0 01-.53-3.704 5.956 5.956 0 011.766-3.3zm-.782 3.474a4.96 4.96 0 011.107-2.363 3.486 3.486 0 01.62 2.654l-.004.013a3.482 3.482 0 01-1.492 2.295 4.952 4.952 0 01-.231-2.6zM9.25 8a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zM6.5 9.75a2.75 2.75 0 115.5 0 2.75 2.75 0 01-5.5 0zM22 16a1 1 0 00-2 0v10a1 1 0 102 0v-1.977V22.5a.5.5 0 011 0v1.501l.002.065A1 1 0 0025 24v-6a1 1 0 00-2-.01v1.51a.5.5 0 11-1 0V16zm-9 4h6v2h-6v-2zm-1 2.522V19.49 16a1 1 0 00-2 0v10a1 1 0 102 0v-3.478zm-3 1.483v.005A1 1 0 017 24v-1.5V19.522 18a1 1 0 011.998-.064l.002.059v6.01zM27 21a1 1 0 01-1 1v-2l.066.002A1 1 0 0127 21zM6 20l-.066.002a1 1 0 000 1.996L6 22v-2zm17.454-9.436a3.487 3.487 0 011.491-2.294c.297.803.392 1.693.232 2.598a4.968 4.968 0 01-1.107 2.363 3.49 3.49 0 01-.616-2.667z" fill={blue}></path></svg>)
    case "Other":
      return (
        <svg width={width} height={height} id="star_svg__eds-icon--star_svg" x="0" y="0" viewBox="0 0 24 24"><path id="star_svg__eds-icon--star_base" fillRule="evenodd" clipRule="evenodd" d="M8.6 14.1l-4-3.6h5.3L12 4.9l2.1 5.6h5.3l-4 3.6 1.5 5.6-4.9-3.2-4.9 3.2 1.5-5.6zM12 2L9.2 9.5H2l5.5 5-2 7.5 6.5-4.3 6.5 4.3-2-7.5 5.5-5h-7.2L12 2z" fill={blue}></path></svg>)
  }
}
