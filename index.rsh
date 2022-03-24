'reach 0.1';

const MUInt = Maybe(UInt);
const common = {
 showOutcome: Fun([Address], Null)
};
const Params = Tuple(Token, UInt, UInt);
// Creator is a Participant that has getSale, seeBid and timeout functions.  A participant is an “actor” who takes part in the application (dApp). Participants are associated with an account (address) on the consensus network.
export const main = Reach.App(() => {
 const Creator = Participant('Creator', {
   ...common,
   getSale: Fun([], Params),
   seeBid: Fun([Address, UInt], Null),
   timeout: Fun([], Null),
 });
 // Bidder is a ParticipantClass that has seeParams and getBid functions. 
 const Bidder = ParticipantClass('Bidder', {
   ...common,
   seeParams: Fun([Params], Null),
   getBid: Fun([UInt], MUInt),
 });
 deploy()
//define properties of creator
Creator.only(() => {
    const [ nftId, reservePrice, lenInBlocks ] = declassify(interact.getSale());
  });
//make public creator's content to network
Creator.publish(nftId, reservePrice, lenInBlocks);
const amt = 1;
  commit();
  Creator.pay([[amt, nftId]]);
  // returns network time of the last publication of dApp
  const end = lastConsensusTime() + lenInBlocks;
  Bidder.interact.seeParams([nftId, reservePrice, end]);

  // parallelReduce facilitates bidders repeatedly providing new bids as they compete to be the highest bidder before a time limit is reached
 const [ highestBidder, lastPrice, currentPrice ] =
 parallelReduce([ Creator, 0, reservePrice ])
   .invariant(balance(nftId) == amt && balance() == lastPrice)
   .while(lastConsensusTime() <= end)
   // If the bid is greater than the currentPrice, the transfer is made to the highest bidder. It will also refund the previous high bidder.
   .case(Bidder,
     (() => {
       const mbid = highestBidder != this
         ? declassify(interact.getBid(currentPrice))
         : MUInt.None();
       return ({
         // The Maybe computation can be some or none: (evaluate the return of a function).
         when: maybe(mbid, false, ((b) => b > currentPrice)),
         msg : fromSome(mbid, 0)
       });
     }),
     ((bid) => bid),
     ((bid) => {
       require(bid > currentPrice);
       // A consensus transfer occurs when a single participant (called the originator) makes a publication of a set of public values from its local state and transfers zero or more network tokens to the contract account.
       transfer(lastPrice).to(highestBidder);
       Creator.interact.seeBid(this, bid);
       return [ this, bid, bid ];
     }))
     //timeout to prevent participants from stalling transactions in their local steps
     .timeout(absoluteTime(end), () => {
      Creator.interact.timeout();
      Creator.publish();
      return [ highestBidder, lastPrice, currentPrice ];
    });
});