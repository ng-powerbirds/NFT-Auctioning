//desired output f

/*Creator has 99.999 ALGO and 1 of the NFT
Creator sets parameters of sale
Bob has 100 ALGO and 0 of the NFT
Bob decides to bid 5.879184
Carla has 100 ALGO and 0 of the NFT
Carla decides to bid 0.680133
Alice has 100 ALGO and 0 of the NFT
Alice decides to bid 9.918794
Bob sees that the NFT is 6, the reserve price is 2, and that they have until 38 to bid
Carla sees that the NFT is 6, the reserve price is 2, and that they have until 38 to bid
Alice sees that the NFT is 6, the reserve price is 2, and that they have until 38 to bid
Carla does not bid because 2 is too high
Bob bids 5.879184 against 2
Alice bids 9.918794 against 2
Carla does not bid because 5.879184 is too high
Creator saw that 2F4HFE5QJXN6D4ZC7OZ332JDTQHHERCVN44Y3GBSJMSX64MNHN3AYXJASA bid 5.879184
Alice bids 9.918794 against 5.879184
Bob does not bid because 9.918794 is too high
Creator saw that Y43GY3ESHUL3CTL7G3PUUO3Z5F7TUEJU65P5YLJURP2SCXFU2OBQLXN42M bid 9.918794
Carla does not bid because 9.918794 is too high
Creator observes the auction has hit the timeout
Creator observes the auction has hit the timeout
Creator saw that Y43GY3ESHUL3CTL7G3PUUO3Z5F7TUEJU65P5YLJURP2SCXFU2OBQLXN42M won
Creator has 109.904794 ALGO and 0 of the NFT
Bob does not bid because 9.918794 is too high
Bob saw that Y43GY3ESHUL3CTL7G3PUUO3Z5F7TUEJU65P5YLJURP2SCXFU2OBQLXN42M won
Alice saw that Y43GY3ESHUL3CTL7G3PUUO3Z5F7TUEJU65P5YLJURP2SCXFU2OBQLXN42M won
Bob has 99.996 ALGO and 0 of the NFT
Alice has 90.077206 ALGO and 1 of the NFT
Carla does not bid because 9.918794 is too high
Carla saw that Y43GY3ESHUL3CTL7G3PUUO3Z5F7TUEJU65P5YLJURP2SCXFU2OBQLXN42M won
Carla has 99.999099 ALGO and 0 of the NFT*/

import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const N = 3;
const names = ["Creator", "Alice", "Bob", "Carla"];

const stdlib = loadStdlib();
const startingBalance = stdlib.parseCurrency(100);
const [ accCreator, ...accBidders ] =
  await stdlib.newTestAccounts(1+N, startingBalance);
// We're including this for automation, but it would be better if the NFT is
// assumed to already exist, or if it this contract actually created it.
const theNFT = await stdlib.launchToken(accCreator, "beepboop", "NFT", { supply: 1 });

await Promise.all( [ accCreator, ...accBidders ].map(async (acc, i) => {
  acc.setDebugLabel(names[i]);
}));

const showBalance = async (acc, i) => {
  const amt = await stdlib.balanceOf(acc);
  const amtNFT = await stdlib.balanceOf(acc, theNFT.id);
  console.log(`${names[i]} has ${stdlib.formatCurrency(amt)} ${stdlib.standardUnit} and ${amtNFT} of the NFT`);
};

const ctcCreator = accCreator.contract(backend);

await Promise.all([
  (async () => {
    await showBalance(accCreator, 0);
    const n = names[0];
    await backend.Creator(ctcCreator, {
      getSale: () => {
        console.log(`${n} sets parameters of sale`);
        return [ theNFT.id, stdlib.parseCurrency(2), 30 ]
      },
      seeBid: (who, bid) => {
        console.log(`${n} saw that ${stdlib.formatAddress(who)} bid ${stdlib.formatCurrency(bid)}`);
      },
      timeout: () => {
        console.log(`${n} observes the auction has hit the timeout`);
      },
      showOutcome: (winner) => {
        console.log(`${n} saw that ${stdlib.formatAddress(winner)} won`);
      },
    });
    await showBalance(accCreator, 0);
  })(),
  ...accBidders.map(async (acc, i) => {
    await showBalance(acc, i+1);
    const n = names[i+1];
    const ctc = acc.contract(backend, ctcCreator.getInfo());
    const bid = stdlib.parseCurrency(Math.random() * 10);
    let IWon = false;
    console.log(`${n} decides to bid ${stdlib.formatCurrency(bid)}`);
    await backend.Bidder(ctc, {
      showOutcome: (winner) => {
        console.log(`${n} saw that ${stdlib.formatAddress(winner)} won`);
        IWon = stdlib.addressEq(winner, acc);
      },
      seeParams: async ([nftId, reservePrice, end]) => {
        console.log(`${n} sees that the NFT is ${nftId}, the reserve price is ${stdlib.formatCurrency(reservePrice)}, and that they have until ${end} to bid`);
        await acc.tokenAccept(nftId);
      },
      getBid: (currentPrice) => {
        if ( currentPrice.lt(bid) ) {
          console.log(`${n} bids ${stdlib.formatCurrency(bid)} against ${stdlib.formatCurrency(currentPrice)}`);
          return ['Some', bid];
        } else {
          console.log(`${n} does not bid because ${stdlib.formatCurrency(currentPrice)} is too high`);
          return ['None', null];
        }
      },
    });
    await showBalance(acc, i+1);
    if ( ! IWon ) {
      await theNFT.optOut(acc);
    }
    return;
  },
)]);
