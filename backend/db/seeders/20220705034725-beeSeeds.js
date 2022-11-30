'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bees', [
      {
        name: 'Bumblebee',
        address: 'Chimney Rock Trail',
        city: 'Inverness',
        state: 'California',
        country: 'USA',
        price: 24.99,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Bombus_flavifrons.jpg',
        userId: 2,
        description: 'Your standard run-of-the-mill bumblebee.',
        details: 'The bumblebee is a very important specimen that allows many types of plant life to exist in the world. If it were not for this bee, the plants we know and love around the world would not be alive today.'
      },
      {
        name: 'Black Dwarf Honey Bee',
        address: 'A, 202 Moo 9, T, Mae Win, Mae Wang District',
        city: 'Chiang Mai',
        state: 'Chiang Mai',
        country: 'Thailand',
        price: 124.36,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Apis_andreniformis_%28side_view%29_BNHM%28E%29013384181_%28cropped_version%29.jpg',
        userId: 2,
        description: 'A special black dwarf honey bee',
        details: 'The honey bee is a very important specimen that allows many types of plant life to exist in the world. If it were not for this bee, the plants we know and love around the world would not be alive today. This variety of honey bee is especially cute!'
      },
      {
        name: 'Green Carpenter Bee',
        address: '4068 Playford Hwy',
        city: 'Duncan',
        state: 'South Australia',
        country: 'Australia',
        price: 56.36,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Xylocopa_aeratus.jpg/220px-Xylocopa_aeratus.jpg',
        userId: 3,
        description: 'Pretty cool bee',
        details: 'I believe this bee makes furniture, or something? I dunno but it\'s pretty darn cool mate.'
      },
      {
        name: 'Japanese Giant Hornet',
        address: '1-41 Miyamachi',
        city: 'Nakafurano',
        state: 'Hokkaido',
        country: 'Japan',
        price: 46.24,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/20200512-P1100071_Vespa_mandarinia_japonica.jpg/220px-20200512-P1100071_Vespa_mandarinia_japonica.jpg',
        userId: 4,
        description: 'これは私が散歩で見つけたかなりクールな蜂です。',
        details: '危険かもしれませんので、見つけたら距離を保ってください。しかし、それはキャッチする価値があるかもしれません！ \n English: (it might be dangerous, so keep your distance if you find it. it might be worth catching, though!)'
      },
      {
        name: 'Ligurian (Italian) Bee',
        address: 'Natural Area Parco delle Mura',
        city: 'Genoa',
        state: 'Liguria',
        country: 'Italy',
        price: 35.55,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Honeybee-27527-1.jpg/1200px-Honeybee-27527-1.jpg',
        userId: 5,
        description: 'ape speciale',
        details: 'vieni a visitare Genova e cattura api rare come questa! \n English: (come visit Genoa and catch rare bees such as this one!)'
      },
      {
        name: 'Emerald Cockroach Wasp',
        address: 'Unknown',
        city: 'Unknown',
        state: 'Unknown',
        country: 'Phillipines',
        price: 145.45,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Bombus_flavifrons.jpg',
        userId: 3,
        description: 'The emerald cockroach wasp or jewel wasp (Ampulex compressa) is a solitary wasp of the family Ampulicidae.',
        details: "It is known for its unusual reproductive behavior, which involves stinging a cockroach and using it as a host for its larvae. It thus belongs to the entomophagous parasites. The wasp has a metallic blue-green body, with the thighs of the second and third pair of legs red. The female is about 22 mm long; the male is smaller and lacks a stinger.[2] Males can be less than half of a female in size if emerging from a smaller or a superparasitized host.[3] The species undergoes four larval stages, where the initial younger larvae can be seen as external hemolymph-feeders on the paralysed roach's leg, and the last instar feeds internally.[6] Upon pupation it produces a chocolate-coloured, thick, spindle-shaped cocoon which can be found inside the dead cockroach within the burrow."
      },
      {
        name: 'Mud Dauber',
        address: 'Unknown',
        city: 'Unknown',
        state: 'Unknown',
        country: 'USA',
        price: 76.00,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Sceliphron_caementarium_MHNT_Profil.jpg/250px-Sceliphron_caementarium_MHNT_Profil.jpg',
        userId: 4,
        description: 'Mud dauber (or "mud wasp" or "dirt dauber") is a name commonly applied to a number of wasps from either the family Sphecidae or Crabronidae.',
        details: "Mud daubers belong to different families and are variable in appearance. Most are long, slender wasps about 1 inch (25 mm) in length.[1] The name refers to the nests that are made by the female wasps, which consist of mud molded into place by the wasp's mandibles. Mud daubers are not normally aggressive, but can become belligerent when threatened. Stings are uncommon."
      },
      {
        name: 'Stingless Bee',
        address: 'Unknown',
        city: 'Unknown',
        state: 'Unknown',
        country: 'Australia',
        price: 86.43,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Meliponula_ferruginea.jpg/220px-Meliponula_ferruginea.jpg',
        userId: 2,
        description: 'Stingless bees, sometimes called stingless honey bees or simply meliponines, are a large group of bees (about 550 described species), comprising the tribe Meliponini[1][2] (or subtribe Meliponina according to other authors).[3] ',
        details: "Meliponines have stingers, but they are highly reduced and cannot be used for defense, though these bees exhibit other defensive behaviors and mechanisms. Meliponines are not the only type of bee incapable of stinging: all male bees and many female bees of several other families, such as Andrenidae, also cannot sting.[1] Some stingless bees have powerful mandibles and can inflict painful bites."
      },
      {
        name: 'Orchid Bee',
        address: 'Unknown',
        city: 'Unknown',
        state: 'Unknown',
        country: 'Australia',
        price: 135.68,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Orchid_Bee_hovering.jpg/220px-Orchid_Bee_hovering.jpg',
        userId: 5,
        description: 'The tribe Euglossini, in the subfamily Apinae, commonly known as orchid bees or euglossine bees, are the only group of corbiculate bees whose non-parasitic members do not all possess eusocial behavior.',
        details: "Male orchid bees have uniquely modified legs which are used to collect and store different volatile compounds (often esters) throughout their lives, primarily from orchids in the subtribes Stanhopeinae and Catasetinae, where all species are exclusively pollinated by euglossine males. These orchids do not produce nectar, and hide the pollen on a single anther under an anther cap; they are not visited by females."
      },
      {
        name: 'Cuckoo Bee',
        address: 'Unknown',
        city: 'Unknown',
        state: 'Unknown',
        country: 'USA',
        price: 64.50,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Nomada_fulvicornis01.jpg/220px-Nomada_fulvicornis01.jpg',
        userId: 4,
        description: 'Nomadinae is a subfamily of bees in the family Apidae. They are known commonly as cuckoo bees.',
        details: "This subfamily is entirely kleptoparasitic.[2] They occur worldwide, and use many different types of bees as hosts. As parasites, they lack a pollen-carrying scopa, and are often extraordinarily wasp-like in appearance. All known species share the behavioral trait of females entering host nests when the host is absent, and inserting their eggs into the wall of the host cell; the larval parasite emerges later, after the cell has been closed by the host female, and kills the host larva. The first-instar larvae of nomadines are specially adapted for this, and possess long mandibles they use to kill the host larva, though these mandibles are lost as soon as the larva molts to the second instar, at which point it simply feeds on the pollen/nectar provisions. A behavioral habit shared by adults of various genera with males of many other bee species, who also do not possess a nest to return to, is that they frequently rest while grasping onto plant stems or leaves with only their mandibles."
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
