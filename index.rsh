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
});