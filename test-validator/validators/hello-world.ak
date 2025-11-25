use aiken/primitive/string
use cardano/transaction.{OutputReference, Transaction}

pub type Redeemer {
  msg: ByteArray,
}

validator hello_world {
  spend(
    _datum: Option<Data>,
    redeemer: Redeemer,
    _own_ref: OutputReference,
    _self: Transaction,
  ) {
    trace @"redeemer": string.from_bytearray(redeemer.msg)
    let must_say_hello = redeemer.msg == "Hello, World!"
    must_say_hello?
  }

  else(_) {
    fail
  }
}
