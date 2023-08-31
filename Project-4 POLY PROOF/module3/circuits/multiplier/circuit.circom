pragma circom 2.0.0;

template arcircuit () {  
  
   signal input a;  
   signal input b;  

   signal x;
   signal y;

   signal output Q;

   component andGate=AND();
   component notGate=NOT();
   component orGate=OR();

   andGate.a <== a;
   andGate.b <== b;
   x <== andGate.out;

   notGate.in <== b;
   y <== notGate.out;

   orGate.a <== x;
   orGate.b <== y;
   Q <== orGate.out;

   log("Q equal to:", Q);

}

template AND() {
    signal input a;
    signal input b;
    signal output out;

    out <== a*b;
}

template NOT() {
    signal input in;
    signal output out;

    out <== 1 + in - 2*in;
}

template OR() {
    signal input a;
    signal input b;
    signal output out;

    out <== a + b - a*b;
}

component main = arcircuit();
/* INPUT = {
    "a": "0",
    "b": "1"
} */
