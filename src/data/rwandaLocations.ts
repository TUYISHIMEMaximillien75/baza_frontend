export interface SectorData {
  name: string;
  cells?: string[];
}

export interface DistrictData {
  name: string;
  sectors: SectorData[];
}

export interface ProvinceData {
  name: string;
  districts: DistrictData[];
}

export const RWANDA_LOCATIONS: ProvinceData[] = [
  {
    name: 'Kigali City',
    districts: [
      {
        name: 'Gasabo',
        sectors: [
          { name: 'Gacuriro / Kinyinya', cells: ['Gacuriro', 'Kagugu', 'Kinyinya', 'Murama'] },
          { name: 'Remera', cells: ['Rukiri I', 'Rukiri II', 'Nyabisindu', 'Nyakariba'] },
          { name: 'Kimironko', cells: ['Kibagabaga', 'Nyagatovu', 'Bibare'] },
          { name: 'Kacyiru', cells: ['Kamatamu', 'Kibatama', 'Kibert'] },
          { name: 'Kimihurura', cells: ['Kimihurura', 'Kamukina', 'Rugando'] },
          { name: 'Bumbogo', cells: ['Azir', 'Kinyinya', 'Nkuzuzu', 'Nyagasozi'] },
          { name: 'Gatsata', cells: ['Karuruma', 'Nyamabuye', 'Nyamugari'] },
          { name: 'Gikomero', cells: ['Gishaka', 'Kibara', 'Munini', 'Ndatemwa'] },
          { name: 'Jabana', cells: ['Akamatamu', 'Bweramvura', 'Kabuye', 'Kidakama'] },
          { name: 'Jali', cells: ['Agateko', 'Byimana', 'Nkusi', 'Nyaburiba'] },
          { name: 'Ndera', cells: ['Birembo', 'Cyeru', 'Kibutata', 'Masoro', 'Mukuyu'] },
          { name: 'Nduba', cells: ['Gasanze', 'Gatare', 'Kigabiro', 'Nyamweru'] },
          { name: 'Rusororo', cells: ['Kabuga I', 'Kabuga II', 'Kinyana', 'Nyagahinga', 'Rugende'] },
          { name: 'Rutunga', cells: ['Indama', 'Kavumu', 'Nyabyondo'] },
        ],
      },
      {
        name: 'Kicukiro',
        sectors: [
          { name: 'Gahanga', cells: ['Gahanga', 'Kagasa', 'Murinja', 'Nunga'] },
          { name: 'Gatenga', cells: ['Gatenga', 'Karambo', 'Nyanza'] },
          { name: 'Gikondo', cells: ['Kagunga', 'Kanserege', 'Kicukiro'] },
          { name: 'Kagarama', cells: ['Kagarama', 'Kanserege'] },
          { name: 'Kanombe', cells: ['Kabeza', 'Karama', 'Rubirizi'] },
          { name: 'Kicukiro', cells: ['Gatare', 'Kicukiro', 'Ngoma'] },
          { name: 'Masaka', cells: ['Ayabaraya', 'Gikundamvura', 'Masaka', 'Mbabe', 'Ririma'] },
          { name: 'Niboye', cells: ['Gatare', 'Niboye', 'Nyakabanda'] },
          { name: 'Nyarugunga', cells: ['Kamashashi', 'Nonko', 'Rwimbogo'] },
        ],
      },
      {
        name: 'Nyarugenge',
        sectors: [
          { name: 'Nyamirambo', cells: ['Biryogo', 'Cyivugiza', 'Gasharu', 'Kivugiza', 'Rwezamenyo'] },
          { name: 'Gitega', cells: ['Akabahizi', 'Gitega I', 'Gitega II', 'Kigarama'] },
          { name: 'Kanyinya', cells: ['Nzana', 'Nyakabingo', 'Nzove'] },
          { name: 'Kigali', cells: ['Akankomo', 'Cyankongi', 'Kigali', 'Mwendo', 'Nyarurenzi'] },
          { name: 'Kimisagara', cells: ['Katabaro', 'Kimisagara', 'Muganza'] },
          { name: 'Mageragere', cells: ['Kankuba', 'Mataba', 'Nyarurenzi', 'Runzenze'] },
          { name: 'Muhima', cells: ['Amahoro', 'Kabeza', 'Kabuye', 'Kiyovu', 'Nyabugogo'] },
          { name: 'Nyakabanda', cells: ['Kinyange', 'Nyakabanda I', 'Nyakabanda II'] },
          { name: 'Nyarugenge', cells: ['Kiyovu', 'Nyarugenge', 'Rwesero'] },
          { name: 'Rwezamenyo', cells: ['Rwezamenyo I', 'Rwezamenyo II'] },
        ],
      },
    ],
  },
  {
    name: 'Northern Province',
    districts: [
      {
        name: 'Musanze',
        sectors: [
          { name: 'Muhoza', cells: ['Cyivugiza', 'Kigombe', 'Mpenge', 'Ruhengeri'] },
          { name: 'Kinigi', cells: ['Bisoke', 'Gahingiro', 'Kabaya', 'Kampanga', 'Kanyamiheto', 'Nyonirima'] },
          { name: 'Busogo', cells: ['Gisesero', 'Kabaya', 'Nyagisozi', 'Sahara'] },
          { name: 'Cyuve', cells: ['Buhita', 'Buramira', 'Gakenke', 'Kabeza', 'Rwebeya'] },
          { name: 'Gacaca', cells: ['Gaseke', 'Kabere', 'Karuganda', 'Rwangara'] },
          { name: 'Gashaki', cells: ['Kigeyo', 'Mbizi', 'Ngozi'] },
          { name: 'Gataraga', cells: ['Gataraga', 'Murago', 'Mudakama', 'Rubindi'] },
          { name: 'Kimonyi', cells: ['Birira', 'Buramira', 'Gihizi', 'Kirimwenda'] },
          { name: 'Muko', cells: ['Cyiri', 'Gipfundo', 'Muko', 'Sangano'] },
          { name: 'Musanze', cells: ['Cyabararika', 'Garuka', 'Nyaxhingiro'] },
          { name: 'Nkotsi', cells: ['Bikara', 'Gashangiro', 'Kintobo'] },
          { name: 'Nyange', cells: ['Cyarubazi', 'Kansoro', 'Ninda'] },
          { name: 'Remera', cells: ['Cyanya', 'Murama', 'Rwerere'] },
          { name: 'Rwaza', cells: ['Kagitega', 'Musezero', 'Nturo'] },
          { name: 'Shingiro', cells: ['Gashaki', 'Kibande', 'Mugari'] },
        ],
      },
      {
        name: 'Burera',
        sectors: [
          { name: 'Bungwe', cells: ['Bungwe', 'Gatsibo'] },
          { name: 'Butaro', cells: ['Butaro', 'Kivuye'] },
          { name: 'Cyanika', cells: ['Cyanika', 'Gahunga'] },
          { name: 'Cyeru', cells: ['Cyeru', 'Rugendabari'] },
          { name: 'Gahunga', cells: ['Gahunga', 'Rugarama'] },
          { name: 'Gatebe', cells: ['Gatebe'] },
          { name: 'Gitovu', cells: ['Gitovu'] },
          { name: 'Kagogo', cells: ['Kagogo'] },
          { name: 'Kinoni', cells: ['Kinoni'] },
          { name: 'Kinyababa', cells: ['Kinyababa'] },
          { name: 'Kivuye', cells: ['Kivuye'] },
          { name: 'Nemba', cells: ['Nemba'] },
          { name: 'Rugarama', cells: ['Rugarama'] },
          { name: 'Rugendabari', cells: ['Rugendabari'] },
          { name: 'Ruhunde', cells: ['Ruhunde'] },
          { name: 'Rusarabuye', cells: ['Rusarabuye'] },
          { name: 'Rwerere', cells: ['Rwerere'] },
        ],
      },
      {
        name: 'Gakenke',
        sectors: [
          { name: 'Gakenke', cells: ['Gakenke', 'Kivuruga'] },
          { name: 'Busengo', cells: ['Busengo'] },
          { name: 'Coko', cells: ['Coko'] },
          { name: 'Cyabingo', cells: ['Cyabingo'] },
          { name: 'Gashenyi', cells: ['Gashenyi'] },
          { name: 'Janja', cells: ['Janja'] },
          { name: 'Kamubuga', cells: ['Kamubuga'] },
          { name: 'Karambo', cells: ['Karambo'] },
          { name: 'Kivuruga', cells: ['Kivuruga'] },
          { name: 'Mataba', cells: ['Mataba'] },
          { name: 'Minazi', cells: ['Minazi'] },
          { name: 'Muhondo', cells: ['Muhondo'] },
          { name: 'Mugunga', cells: ['Mugunga'] },
          { name: 'Muyongwe', cells: ['Muyongwe'] },
          { name: 'Muzo', cells: ['Muzo'] },
          { name: 'Nemba', cells: ['Nemba'] },
          { name: 'Ruli', cells: ['Ruli'] },
          { name: 'Rusasa', cells: ['Rusasa'] },
          { name: 'Rushashi', cells: ['Rushashi'] },
        ],
      },
      {
        name: 'Gicumbi',
        sectors: [
          { name: 'Byumba', cells: ['Gacurabwenge', 'Giseke', 'Kibali', 'Nyarutarama'] },
          { name: 'Bukure', cells: ['Bukure'] },
          { name: 'Bwisige', cells: ['Bwisige'] },
          { name: 'Cyumba', cells: ['Cyumba'] },
          { name: 'Giti', cells: ['Giti'] },
          { name: 'Kaniga', cells: ['Kaniga'] },
          { name: 'Manyagiro', cells: ['Manyagiro'] },
          { name: 'Miyove', cells: ['Miyove'] },
          { name: 'Kageyo', cells: ['Kageyo'] },
          { name: 'Mukarange', cells: ['Mukarange'] },
          { name: 'Muko', cells: ['Muko'] },
          { name: 'Mutete', cells: ['Mutete'] },
          { name: 'Nyamiyaga', cells: ['Nyamiyaga'] },
          { name: 'Nyankenke', cells: ['Nyankenke'] },
          { name: 'Rubaya', cells: ['Rubaya'] },
          { name: 'Rukomo', cells: ['Rukomo'] },
          { name: 'Rushaki', cells: ['Rushaki'] },
          { name: 'Rutare', cells: ['Rutare'] },
          { name: 'Ruvune', cells: ['Ruvune'] },
          { name: 'Wamuko', cells: ['Wamuko'] },
        ],
      },
      {
        name: 'Rulindo',
        sectors: [
          { name: 'Base', cells: ['Base', 'Cyohoha'] },
          { name: 'Burega', cells: ['Burega'] },
          { name: 'Bushoki', cells: ['Bushoki'] },
          { name: 'Buyoga', cells: ['Buyoga'] },
          { name: 'Cyinzuzi', cells: ['Cyinzuzi'] },
          { name: 'Cyungo', cells: ['Cyungo'] },
          { name: 'Kinihira', cells: ['Kinihira'] },
          { name: 'Kisaro', cells: ['Kisaro'] },
          { name: 'Masoro', cells: ['Masoro'] },
          { name: 'Mbogo', cells: ['Mbogo'] },
          { name: 'Murambi', cells: ['Murambi'] },
          { name: 'Ngoma', cells: ['Ngoma'] },
          { name: 'Ntarabana', cells: ['Ntarabana'] },
          { name: 'Rukozo', cells: ['Rukozo'] },
          { name: 'Rusiga', cells: ['Rusiga'] },
          { name: 'Shyorongi', cells: ['Shyorongi'] },
          { name: 'Tumba', cells: ['Tumba'] },
        ],
      },
    ],
  },
  {
    name: 'Southern Province',
    districts: [
      {
        name: 'Huye',
        sectors: [
          { name: 'Ngoma', cells: ['Matyazo', 'Ngoma', 'Rango A', 'Rango B'] },
          { name: 'Tumba', cells: ['Cyarwa', 'Gitwa', 'Mpare', 'Rango'] },
          { name: 'Gishamvu', cells: ['Kinyamakara', 'Mukwege', 'Nyakibanda'] },
          { name: 'Karama', cells: ['Gahororo', 'Kibingo', 'Mpinga'] },
          { name: 'Kigoma', cells: ['Cyeru', 'Gisunyu', 'Kabacuzi'] },
          { name: 'Mukura', cells: ['Buhimba', 'Ikora', 'Rwinuma'] },
          { name: 'Ruhashya', cells: ['Busoro', 'Gatobo', 'Mara'] },
          { name: 'Rusatira', cells: ['Gafumba', 'Kiruhura', 'Mubumbano'] },
          { name: 'Rwaniro', cells: ['Kibizi', 'Nyakabuye', 'Shori'] },
          { name: 'Simbi', cells: ['Kabasesero', 'Nyamagana', 'Simbi'] },
          { name: 'Maraba', cells: ['Kizi', 'Shyama', 'Tare'] },
          { name: 'Mbazi', cells: ['Gatobotobo', 'Kabuga', 'Rugango'] },
        ],
      },
      {
        name: 'Muhanga',
        sectors: [
          { name: 'Nyamabuye', cells: ['Nyamabuye', 'Gitarama', 'Shyogwe'] },
          { name: 'Cyeza', cells: ['Cyeza'] },
          { name: 'Kabacuzi', cells: ['Kabacuzi'] },
          { name: 'Kibangu', cells: ['Kibangu'] },
          { name: 'Kiyumba', cells: ['Kiyumba'] },
          { name: 'Muhanga', cells: ['Muhanga'] },
          { name: 'Mushishiro', cells: ['Mushishiro'] },
          { name: 'Nyabinoni', cells: ['Nyabinoni'] },
          { name: 'Nyarusange', cells: ['Nyarusange'] },
          { name: 'Rongi', cells: ['Rongi'] },
          { name: 'Rugendabari', cells: ['Rugendabari'] },
          { name: 'Shyogwe', cells: ['Shyogwe'] },
        ],
      },
      {
        name: 'Nyanza',
        sectors: [
          { name: 'Busasamana', cells: ['Busasamana', 'Nyanza Town'] },
          { name: 'Busoro', cells: ['Busoro'] },
          { name: 'Cyabakamyi', cells: ['Cyabakamyi'] },
          { name: 'Kibirizi', cells: ['Kibirizi'] },
          { name: 'Kigoma', cells: ['Kigoma'] },
          { name: 'Mukingo', cells: ['Mukingo'] },
          { name: 'Muyira', cells: ['Muyira'] },
          { name: 'Ntyazo', cells: ['Ntyazo'] },
          { name: 'Nyagisozi', cells: ['Nyagisozi'] },
          { name: 'Rwabicuma', cells: ['Rwabicuma'] },
        ],
      },
      {
        name: 'Kamonyi',
        sectors: [
          { name: 'Gacurabwenge', cells: ['Gacurabwenge', 'Kamonyi'] },
          { name: 'Karama', cells: ['Karama'] },
          { name: 'Kayenzi', cells: ['Kayenzi'] },
          { name: 'Kayumbu', cells: ['Kayumbu'] },
          { name: 'Mugina', cells: ['Mugina'] },
          { name: 'Musambira', cells: ['Musambira'] },
          { name: 'Ngamba', cells: ['Ngamba'] },
          { name: 'Nyamiyaga', cells: ['Nyamiyaga'] },
          { name: 'Runda', cells: ['Runda', 'Gihara'] },
          { name: 'Rukoma', cells: ['Rukoma'] },
        ],
      },
      {
        name: 'Gisagara',
        sectors: [
          { name: 'Ndora', cells: ['Ndora', 'Gisagara'] },
          { name: 'Gikonko', cells: ['Gikonko'] },
          { name: 'Gishamvu', cells: ['Gishamvu'] },
          { name: 'Kansi', cells: ['Kansi'] },
          { name: 'Kibirizi', cells: ['Kibirizi'] },
          { name: 'Kigembe', cells: ['Kigembe'] },
          { name: 'Mamba', cells: ['Mamba'] },
          { name: 'Muganza', cells: ['Muganza'] },
          { name: 'Mugombwa', cells: ['Mugombwa'] },
          { name: 'Mukindo', cells: ['Mukindo'] },
          { name: 'Musha', cells: ['Musha'] },
          { name: 'Nyanza', cells: ['Nyanza'] },
          { name: 'Save', cells: ['Save'] },
        ],
      },
      {
        name: 'Nyamagabe',
        sectors: [
          { name: 'Gasaka', cells: ['Gasaka', 'Nyamagabe Town'] },
          { name: 'Buruhukiro', cells: ['Buruhukiro'] },
          { name: 'Cyanika', cells: ['Cyanika'] },
          { name: 'Gatare', cells: ['Gatare'] },
          { name: 'Kaduha', cells: ['Kaduha'] },
          { name: 'Kamegeli', cells: ['Kamegeli'] },
          { name: 'Kibirizi', cells: ['Kibirizi'] },
          { name: 'Kibumbwe', cells: ['Kibumbwe'] },
          { name: 'Kitabi', cells: ['Kitabi'] },
          { name: 'Mbazi', cells: ['Mbazi'] },
          { name: 'Mugano', cells: ['Mugano'] },
          { name: 'Musange', cells: ['Musange'] },
          { name: 'Musebeya', cells: ['Musebeya'] },
          { name: 'Nshili', cells: ['Nshili'] },
          { name: 'Nyarusange', cells: ['Nyarusange'] },
          { name: 'Tare', cells: ['Tare'] },
          { name: 'Uwinkingi', cells: ['Uwinkingi'] },
        ],
      },
      {
        name: 'Nyaruguru',
        sectors: [
          { name: 'Kibeho', cells: ['Kibeho', 'Mata'] },
          { name: 'Cyahinda', cells: ['Cyahinda'] },
          { name: 'Busanze', cells: ['Busanze'] },
          { name: 'Kivu', cells: ['Kivu'] },
          { name: 'Mata', cells: ['Mata'] },
          { name: 'Muganza', cells: ['Muganza'] },
          { name: 'Munini', cells: ['Munini'] },
          { name: 'Ngera', cells: ['Ngera'] },
          { name: 'Ngoma', cells: ['Ngoma'] },
          { name: 'Nyabimata', cells: ['Nyabimata'] },
          { name: 'Nyagisozi', cells: ['Nyagisozi'] },
          { name: 'Ruheru', cells: ['Ruheru'] },
          { name: 'Ruramba', cells: ['Ruramba'] },
          { name: 'Rusenge', cells: ['Rusenge'] },
        ],
      },
      {
        name: 'Ruhango',
        sectors: [
          { name: 'Ruhango', cells: ['Ruhango', 'Ntenyo'] },
          { name: 'Bweramana', cells: ['Bweramana'] },
          { name: 'Byimana', cells: ['Byimana'] },
          { name: 'Kabagari', cells: ['Kabagari'] },
          { name: 'Kinazi', cells: ['Kinazi'] },
          { name: 'Kinihira', cells: ['Kinihira'] },
          { name: 'Mbuye', cells: ['Mbuye'] },
          { name: 'Ntongwe', cells: ['Ntongwe'] },
          { name: 'Shyogwe', cells: ['Shyogwe'] },
        ],
      },
    ],
  },
  {
    name: 'Western Province',
    districts: [
      {
        name: 'Rubavu',
        sectors: [
          { name: 'Gisenyi', cells: ['Amahoro', 'Nyakiliba', 'Nyamirambo', 'Rukoko', 'Ubumwe'] },
          { name: 'Rugerero', cells: ['Gisa', 'Kinyanzovu', 'Rugerero'] },
          { name: 'Nyamyumba', cells: ['Busoro', 'Rubona', 'Shusha'] },
          { name: 'Nyakiliba', cells: ['Kanyefije', 'Mizingo', 'Nyakiliba'] },
          { name: 'Bugesera', cells: ['Buhaza', 'Gisenyi'] },
          { name: 'Busasamana', cells: ['Gihira', 'Kerepwa'] },
          { name: 'Cyanzarwe', cells: ['Busigari', 'Ryabizige'] },
          { name: 'Kanama', cells: ['Karambo', 'Mahoko'] },
          { name: 'Kanzenze', cells: ['Kazi', 'Kiraga'] },
          { name: 'Mudende', cells: ['Bihemu', 'Mudende'] },
          { name: 'Rubavu', cells: ['Byahi', 'Gikombe', 'Rukoko'] },
        ],
      },
      {
        name: 'Karongi',
        sectors: [
          { name: 'Bwishyura', cells: ['Bwishyura', 'Kibuye Town'] },
          { name: 'Gishyita', cells: ['Gishyita'] },
          { name: 'Gisovu', cells: ['Gisovu'] },
          { name: 'Gashari', cells: ['Gashari'] },
          { name: 'Karongi', cells: ['Karongi'] },
          { name: 'Murambi', cells: ['Murambi'] },
          { name: 'Murundi', cells: ['Murundi'] },
          { name: 'Mutuntu', cells: ['Mutuntu'] },
          { name: 'Rubengera', cells: ['Rubengera'] },
          { name: 'Rugabano', cells: ['Rugabano'] },
          { name: 'Ruganda', cells: ['Ruganda'] },
          { name: 'Rwankuba', cells: ['Rwankuba'] },
          { name: 'Twumba', cells: ['Twumba'] },
        ],
      },
      {
        name: 'Rusizi',
        sectors: [
          { name: 'Kamembe', cells: ['Kamembe', 'Gihundwe', 'Cyangugu'] },
          { name: 'Gihundwe', cells: ['Gihundwe'] },
          { name: 'Giheke', cells: ['Giheke'] },
          { name: 'Gashonga', cells: ['Gashonga'] },
          { name: 'Mururu', cells: ['Mururu'] },
          { name: 'Nkanka', cells: ['Nkanka'] },
          { name: 'Nkombo', cells: ['Nkombo'] },
          { name: 'Nkungu', cells: ['Nkungu'] },
          { name: 'Nyakarenzo', cells: ['Nyakarenzo'] },
          { name: 'Nzahaha', cells: ['Nzahaha'] },
          { name: 'Bugarama', cells: ['Bugarama'] },
          { name: 'Bweyeye', cells: ['Bweyeye'] },
          { name: 'Butare', cells: ['Butare'] },
          { name: 'Muganza', cells: ['Muganza'] },
        ],
      },
      {
        name: 'Ngororero',
        sectors: [
          { name: 'Ngororero', cells: ['Ngororero'] },
          { name: 'Bwira', cells: ['Bwira'] },
          { name: 'Gatumba', cells: ['Gatumba'] },
          { name: 'Hindiro', cells: ['Hindiro'] },
          { name: 'Kabaya', cells: ['Kabaya'] },
          { name: 'Kageyo', cells: ['Kageyo'] },
          { name: 'Kavumu', cells: ['Kavumu'] },
          { name: 'Matyazo', cells: ['Matyazo'] },
          { name: 'Muhanda', cells: ['Muhanda'] },
          { name: 'Muhororo', cells: ['Muhororo'] },
          { name: 'Sovu', cells: ['Sovu'] },
          { name: 'Nyange', cells: ['Nyange'] },
        ],
      },
      {
        name: 'Nyabihu',
        sectors: [
          { name: 'Mukamira', cells: ['Mukamira'] },
          { name: 'Bigogwe', cells: ['Bigogwe'] },
          { name: 'Jenda', cells: ['Jenda'] },
          { name: 'Jomba', cells: ['Jomba'] },
          { name: 'Kabatwa', cells: ['Kabatwa'] },
          { name: 'Karago', cells: ['Karago'] },
          { name: 'Kintobo', cells: ['Kintobo'] },
          { name: 'Muringa', cells: ['Muringa'] },
          { name: 'Rambura', cells: ['Rambura'] },
          { name: 'Rugera', cells: ['Rugera'] },
          { name: 'Rurembo', cells: ['Rurembo'] },
          { name: 'Shyira', cells: ['Shyira'] },
        ],
      },
      {
        name: 'Nyamasheke',
        sectors: [
          { name: 'Kagano', cells: ['Kagano', 'Nyamasheke Town'] },
          { name: 'Bushekeri', cells: ['Bushekeri'] },
          { name: 'Bushenge', cells: ['Bushenge'] },
          { name: 'Cyato', cells: ['Cyato'] },
          { name: 'Gihombo', cells: ['Gihombo'] },
          { name: 'Kanjongo', cells: ['Kanjongo'] },
          { name: 'Karambi', cells: ['Karambi'] },
          { name: 'Karengera', cells: ['Karengera'] },
          { name: 'Kirimbi', cells: ['Kirimbi'] },
          { name: 'Macuba', cells: ['Macuba'] },
          { name: 'Nyabitekeri', cells: ['Nyabitekeri'] },
          { name: 'Mahembe', cells: ['Mahembe'] },
          { name: 'Rangiro', cells: ['Rangiro'] },
          { name: 'Ruharambuga', cells: ['Ruharambuga'] },
          { name: 'Shangi', cells: ['Shangi'] },
        ],
      },
      {
        name: 'Rutsiro',
        sectors: [
          { name: 'Gihango', cells: ['Gihango'] },
          { name: 'Boneza', cells: ['Boneza'] },
          { name: 'Kigeyo', cells: ['Kigeyo'] },
          { name: 'Kivumu', cells: ['Kivumu'] },
          { name: 'Manihira', cells: ['Manihira'] },
          { name: 'Mukura', cells: ['Mukura'] },
          { name: 'Murunda', cells: ['Murunda'] },
          { name: 'Musasa', cells: ['Musasa'] },
          { name: 'Mushubati', cells: ['Mushubati'] },
          { name: 'Nyabirasi', cells: ['Nyabirasi'] },
          { name: 'Ruhango', cells: ['Ruhango'] },
          { name: 'Rusebeya', cells: ['Rusebeya'] },
        ],
      },
    ],
  },
  {
    name: 'Eastern Province',
    districts: [
      {
        name: 'Rwamagana',
        sectors: [
          { name: 'Kigabiro', cells: ['Banja', 'Cyanya', 'Gishore', 'Kavumu', 'Nyagasenyi'] },
          { name: 'Gishari', cells: ['Binunga', 'Buhabwa', 'Kavumu', 'Ruhunda'] },
          { name: 'Muhazi', cells: ['Byimana', 'Kabare', 'Karitutu', 'Nsinda'] },
          { name: 'Muyumbu', cells: ['Nkuhesi', 'Muyumbu', 'Nyarugenge'] },
          { name: 'Musha', cells: ['Kapinga', 'Kukabuga', 'Musha'] },
          { name: 'Fumbwe', cells: ['Munini', 'Ntwantwa', 'Nyabirasi'] },
          { name: 'Gahengeri', cells: ['Kageyo', 'Karisimbi', 'Kogonya'] },
          { name: 'Karenge', cells: ['Gishore', 'Karenge', 'Kazinga'] },
          { name: 'Munyaga', cells: ['Kalisimbi', 'Munyaga'] },
          { name: 'Munyiginya', cells: ['Cyeru', 'Munyiginya'] },
          { name: 'Mwulire', cells: ['Mwulire', 'Ntungamo'] },
          { name: 'Nyakariro', cells: ['Gishali', 'Nyakariro'] },
          { name: 'Nzige', cells: ['Nzige', 'Ruramira'] },
          { name: 'Rubona', cells: ['Kabare', 'Rubona'] },
        ],
      },
      {
        name: 'Bugesera',
        sectors: [
          { name: 'Nyamata', cells: ['Nyamata I', 'Nyamata II', 'Kanazi', 'Kayumba'] },
          { name: 'Gashora', cells: ['Gashora'] },
          { name: 'Juru', cells: ['Juru'] },
          { name: 'Kamababa', cells: ['Kamababa'] },
          { name: 'Ntarama', cells: ['Ntarama'] },
          { name: 'Nyezosi', cells: ['Nyezosi'] },
          { name: 'Mareba', cells: ['Mareba'] },
          { name: 'Mayange', cells: ['Mayange'] },
          { name: 'Musenyi', cells: ['Musenyi'] },
          { name: 'Mwogo', cells: ['Mwogo'] },
          { name: 'Ngeruka', cells: ['Ngeruka'] },
          { name: 'Rilima', cells: ['Rilima'] },
          { name: 'Ruhuha', cells: ['Ruhuha'] },
          { name: 'Rweru', cells: ['Rweru'] },
          { name: 'Shyara', cells: ['Shyara'] },
        ],
      },
      {
        name: 'Gatsibo',
        sectors: [
          { name: 'Kabarore', cells: ['Kabarore', 'Gatsibo Town'] },
          { name: 'Gasange', cells: ['Gasange'] },
          { name: 'Gatsibo', cells: ['Gatsibo'] },
          { name: 'Gitoki', cells: ['Gitoki'] },
          { name: 'Kageyo', cells: ['Kageyo'] },
          { name: 'Kiramuruzi', cells: ['Kiramuruzi'] },
          { name: 'Kiziguro', cells: ['Kiziguro'] },
          { name: 'Muhura', cells: ['Muhura'] },
          { name: 'Murambi', cells: ['Murambi'] },
          { name: 'Ngarama', cells: ['Ngarama'] },
          { name: 'Nyagihanga', cells: ['Nyagihanga'] },
          { name: 'Remera', cells: ['Remera'] },
          { name: 'Rugarama', cells: ['Rugarama'] },
          { name: 'Rwimbogo', cells: ['Rwimbogo'] },
        ],
      },
      {
        name: 'Kayonza',
        sectors: [
          { name: 'Mukarange', cells: ['Mukarange', 'Kayonza Town'] },
          { name: 'Gahini', cells: ['Gahini'] },
          { name: 'Kabare', cells: ['Kabare'] },
          { name: 'Kabarondo', cells: ['Kabarondo'] },
          { name: 'Murama', cells: ['Murama'] },
          { name: 'Murundi', cells: ['Murundi'] },
          { name: 'Ndego', cells: ['Ndego'] },
          { name: 'Nyamirama', cells: ['Nyamirama'] },
          { name: 'Rukara', cells: ['Rukara'] },
          { name: 'Ruramira', cells: ['Ruramira'] },
          { name: 'Rwinkwavu', cells: ['Rwinkwavu'] },
        ],
      },
      {
        name: 'Kirehe',
        sectors: [
          { name: 'Kirehe', cells: ['Kirehe'] },
          { name: 'Gahara', cells: ['Gahara'] },
          { name: 'Gatore', cells: ['Gatore'] },
          { name: 'Kigarama', cells: ['Kigarama'] },
          { name: 'Kigina', cells: ['Kigina'] },
          { name: 'Mahama', cells: ['Mahama'] },
          { name: 'Mpanga', cells: ['Mpanga'] },
          { name: 'Musaza', cells: ['Musaza'] },
          { name: 'Mushikiri', cells: ['Mushikiri'] },
          { name: 'Nyamugari', cells: ['Nyamugari'] },
          { name: 'Nyarubuye', cells: ['Nyarubuye'] },
        ],
      },
      {
        name: 'Ngoma',
        sectors: [
          { name: 'Kibungo', cells: ['Kibungo', 'Ngoma Town'] },
          { name: 'Gashanda', cells: ['Gashanda'] },
          { name: 'Jarama', cells: ['Jarama'] },
          { name: 'Karembo', cells: ['Karembo'] },
          { name: 'Kazo', cells: ['Kazo'] },
          { name: 'Mugesera', cells: ['Mugesera'] },
          { name: 'Murama', cells: ['Murama'] },
          { name: 'Mutenderi', cells: ['Mutenderi'] },
          { name: 'Remera', cells: ['Remera'] },
          { name: 'Rukira', cells: ['Rukira'] },
          { name: 'Rukumberi', cells: ['Rukumberi'] },
          { name: 'Rurenge', cells: ['Rurenge'] },
          { name: 'Zaza', cells: ['Zaza'] },
        ],
      },
      {
        name: 'Nyagatare',
        sectors: [
          { name: 'Nyagatare', cells: ['Nyagatare', 'Barija', 'Ngarama'] },
          { name: 'Gatunda', cells: ['Gatunda'] },
          { name: 'Karama', cells: ['Karama'] },
          { name: 'Karangazi', cells: ['Karangazi'] },
          { name: 'Katabagemu', cells: ['Katabagemu'] },
          { name: 'Kiyombe', cells: ['Kiyombe'] },
          { name: 'Matimba', cells: ['Matimba'] },
          { name: 'Mimuri', cells: ['Mimuri'] },
          { name: 'Mukama', cells: ['Mukama'] },
          { name: 'Musheri', cells: ['Musheri'] },
          { name: 'Rukomo', cells: ['Rukomo'] },
          { name: 'Rwempasha', cells: ['Rwempasha'] },
          { name: 'Rwimiyaga', cells: ['Rwimiyaga'] },
          { name: 'Tabagwe', cells: ['Tabagwe'] },
        ],
      },
    ],
  },
];

/**
 * Get all available provinces in Rwanda
 */
export function getProvinces(): string[] {
  return RWANDA_LOCATIONS.map((p) => p.name);
}

/**
 * Get all districts for a given province
 */
export function getDistricts(provinceName?: string): string[] {
  if (!provinceName) return [];
  const prov = RWANDA_LOCATIONS.find((p) => p.name.toLowerCase() === provinceName.toLowerCase());
  return prov ? prov.districts.map((d) => d.name) : [];
}

/**
 * Get all sectors for a given province & district
 */
export function getSectors(provinceName?: string, districtName?: string): string[] {
  if (!provinceName || !districtName) return [];
  const prov = RWANDA_LOCATIONS.find((p) => p.name.toLowerCase() === provinceName.toLowerCase());
  if (!prov) return [];
  const dist = prov.districts.find((d) => d.name.toLowerCase() === districtName.toLowerCase());
  return dist ? dist.sectors.map((s) => s.name) : [];
}

/**
 * Get all cells for a given province, district & sector
 */
export function getCells(provinceName?: string, districtName?: string, sectorName?: string): string[] {
  if (!provinceName || !districtName || !sectorName) return [];
  const prov = RWANDA_LOCATIONS.find((p) => p.name.toLowerCase() === provinceName.toLowerCase());
  if (!prov) return [];
  const dist = prov.districts.find((d) => d.name.toLowerCase() === districtName.toLowerCase());
  if (!dist) return [];
  const sec = dist.sectors.find((s) => s.name.toLowerCase() === sectorName.toLowerCase());
  return sec && sec.cells ? sec.cells : [];
}
