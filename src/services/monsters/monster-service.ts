export class MonsterService {
  private _monsters = [
    'Orc',
    'Goblin',
    'Troll',
    'Vampire',
    'Werewolf',
    'Ghost',
    'Zombie',
    'Giant Spider',
    'Mummy',
    'Ghoul',
    'Skeleton',
    'Wraith',
    'Hydra',
    'Kraken',
    'Manticore',
    'Minotaur',
    'Cyclops',
    'Chimera',
    'Basilisk',
    'Cockatrice',
    'Griffin',
    'Hippogriff',
    'Pegasus',
    'Unicorn',
    'Phoenix',
    'Wyvern',
    'Yeti',
    'Sphinx',
    'Harpy',
    'Centaur',
    'Satyr',
    'Dryad',
    'Nymph',
    'Siren',
    'Mermaid',
    'Sea Serpent',
    'Leviathan',
    'Behemoth',
    'Balrog',
    'Djinn',
    'Elemental',
    'Golem',
    'Lich',
    'Hobgoblin',
    'Goblin Boss',
    'Ancient Black Dragon',
    'Ancient Blue Dragon',
    'Ancient Green Dragon',
    'Ancient Red Dragon',
    'Ancient White Dragon',
    'Ancient Brass Dragon',
    'Ancient Bronze Dragon',
    'Ancient Copper Dragon',
    'Ancient Gold Dragon',
    'Ancient Silver Dragon',
    'Black Dragon Wyrmling',
    'Blue Dragon Wyrmling',
    'Green Dragon Wyrmling',
    'Red Dragon Wyrmling',
    'White Dragon Wyrmling',
    'Brass Dragon Wyrmling',
    'Bronze Dragon Wyrmling',
    'Copper Dragon Wyrmling',
    'Gold Dragon Wyrmling',
    'Silver Dragon Wyrmling',
    'Black Pudding',
    'Gelatinous Cube',
    'Ochre Jelly',
    'Rust Monster',
    'Umber Hulk',
    'Bulette',
    'Displacer Beast',
    'Rakshasa',
    'Mind Flayer',
    'Beholder',
    'Aboleth',
    'Phase Spider',
    'Cloaker',
    'Gorgon',
    'Medusa',
    'Mimic',
    'Roper',
    'Shambling Mound',
    'Tarrasque',
    'Vampire Spawn',
    'Flumph',
    'Gibbering Mouther',
    'Intellect Devourer',
    'Kobold',
    'Lizardfolk',
    'Ogre',
    'Orc War Chief',
    'Orc Eye of Gruumsh',
    'Orc Warlord',
    'Orc Nurtured One of Yurtrus',
    'Orc Red Fang of Shargaas',
    'Orc Claw of Luthic',
    'Orc Hand of Yurtrus',
    'Orc Blade of Ilneval',
    'Orc Eye of Gruumsh',
    'Orc Blade of Ilneval',
    'Red Dragon',
    'Blue Dragon',
    'Green Dragon',
    'White Dragon',
    'Black Dragon',
    'Brass Dragon',
    'Bronze Dragon',
    'Copper Dragon',
    'Gold Dragon',
  ] as const;

  search(monster: string) {
    return this._monsters.filter(m =>
      m.toLowerCase().includes(monster.toLowerCase()),
    );
  }
}
