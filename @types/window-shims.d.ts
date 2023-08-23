export {};

interface MockNuxt {
  $jfShipmentLabels: {
    print: () => void;
  };
}
declare global {
  interface Window {
    $nuxt: MockNuxt;
  }
}
