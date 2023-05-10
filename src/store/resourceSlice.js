import { createSlice } from '@reduxjs/toolkit';

const projectArrTest = [
  // - id serial primary_key
  // - category_name text
  // - img_file_path text
  // - view_count integer
  // - title text
  // - author_img_file_path text
  // - author_name text
  // - link text
  // - collaboration text
  // - scope text
  // - funder text
  // - start_date date
  // - end_date date
  // - description text
  {
    id: 1,
    category_name: 'Area-BCM',
    img_file_path: '',
    view_count: null,
    title:
      'Simulation Development of the Affected Industrial Supply Chain from the COVID-19 Applying the Area-Business Continuity Management (Area-BCM) Concept',
    author_img_file_path: null,
    author_name: null,
    link: '',
    collaboration: '',
    scope: '',
    funder: 'Thailand Science Research and Innovation Fund, Chulalongkorn University',
    start_date: 'October 2021',
    end_date: 'September 2022',
    description: 'Fundamental Fund (FF) (CU_FRB65_dis(22)_147_21_13)',
  },
  {
    id: 2,
    category_name: 'BCM',
    img_file_path: '',
    view_count: null,
    title: 'Sustainable Healthcare System through Business Continuity Management',
    author_img_file_path: null,
    author_name: null,
    link: '',
    collaboration: 'Chulalongkorn University and Jomo Kenyatta University Agriculture and Technology',
    scope: '',
    funder: 'JICA Project for AUN/SEED-Net',
    start_date: 'May 2021',
    end_date: 'February 2022',
    description: 'Collaborative Research with External Partners (CRX) (CU CRX 2102)',
  },
  {
    id: 3,
    category_name: 'Data Analysis',
    img_file_path: '',
    view_count: null,
    title: 'COVID-19 Data Analysis Using Mobile Services Data and Satellite Geospatial Data Towards Sustainable Tourism Business',
    author_img_file_path: null,
    author_name: null,
    link: '',
    collaboration: 'Chulalongkorn University and Keio University',
    scope:
      'COVID-19 situation in the area of Asia continent especially Thailand and Japan by applying the uses of Social media and Geospatial Data',
    funder: 'JICA Project for AUN/SEED-Net',
    start_date: 'October 2020',
    end_date: 'December 2021',
    description: 'Special Program for Research against COVID-19 Project (CU SPRAC 2001 and CU SPRAC 2101)',
  },
];

const researchPublicationArrTest = [
  // - id serial primary_key
  // - category_name text
  // - img_file_path text
  // - view_count integer
  // - title text
  // - author_img_file_path text
  // - author_name text
  // - link text
  // - year integer
  // - full_name text
  {
    id: 1,
    category_name: 'Disaster Research',
    img_file_path: '',
    view_count: null,
    title: 'Agent-based simulation and modeling of COVID-19 pandemic: A bibliometric analysis',
    author_img_file_path: null,
    author_name: null,
    link: '',
    year: 2022,
    full_name:
      'Tang, J., Vinayavekhin, S., Weeramongkolkul, M., Suksanon, C., Pattarapremcharoen, K., Thiwathittayanuphap, S., & Leelawat, N. (2022). Agent-based simulation and modeling of COVID-19 pandemic: A bibliometric analysis. Journal of Disaster Research, 17 (1), 93-102. doi: 10.20965/jdr.2022.p0093 (Scopus Q2)',
  },
  {
    id: 2,
    category_name: 'Disaster Research',
    img_file_path: '',
    view_count: null,
    title: 'Interventions to support tourism and its impact on air quality – A case study of the Go To Travel campaign in Japan',
    author_img_file_path: null,
    author_name: null,
    link: '',
    year: 2022,
    full_name:
      'Kodaka, A., Detera, B. J., Onda, Y., Leelawat, N., Tang, J., Laosunthara, A., Saengtabtim, K., & Kohtake, N. (2022). Interventions to support tourism and its impact on air quality – A case study of the Go To Travel campaign in Japan. Journal of Disaster Research, 17 (1), 123-135. doi: 10.20965/jdr.2022.p0123 (Scopus Q2)',
  },
  {
    id: 3,
    category_name: 'ACS Chemical Health & Safety',
    img_file_path: '',
    view_count: null,
    title: 'A polystyrene foam factory fire in a Bangkok satellite city: Incident and lessons learned',
    author_img_file_path: null,
    author_name: null,
    link: '',
    year: 2021,
    full_name:
      'Leelawat, N., & Vilaivan, T. (2021). A polystyrene foam factory fire in a Bangkok satellite city: Incident and lessons learned. ACS Chemical Health & Safety, 28 (6), 394-396. doi: 10.1021/acs.chas.1c00071',
  },
  {
    id: 4,
    category_name: 'Disaster Research',
    img_file_path: '',
    view_count: null,
    title: 'Comparison of the initial overseas evacuation operations due to COVID-19: A focus on Asian countries',
    author_img_file_path: null,
    author_name: null,
    link: '',
    year: 2021,
    full_name:
      'Leelawat, N., Tang, J., Krutphong, K., Chaichanasiri, S., Kanno, T., Li, C. W., Le, L. T. Q., Dung, H. Q., Saengtabtim, K., & Laosunthara, A. (2021). Comparison of the initial overseas evacuation operations due to COVID-19: A focus on Asian countries. Journal of Disaster Research, 16 (7), 1137-1146. doi: 10.20965/jdr.2021.p1137 (Scopus Q2)',
  },
  {
    id: 5,
    category_name: 'Disaster Research',
    img_file_path: '',
    view_count: null,
    title: 'The 2011 Great East Japan earthquake and tsunami: A message from Japan to Thailand',
    author_img_file_path: null,
    author_name: null,
    link: '',
    year: 2021,
    full_name:
      'Leelawat, N., Laosunthara, A., Tang, J., Suppasri, A., Ruangrassamee, A., Akkharaprathompong, P., & Imamura, F. (2021). The 2011 Great East Japan earthquake and tsunami: A message from Japan to Thailand. Journal of Disaster Research, 16 (6), 908-913. doi: 10.20965/jdr.2021.p0908 (Scopus Q2)',
  },
  {
    id: 6,
    category_name: 'Disaster Research',
    img_file_path: '',
    view_count: null,
    title: 'Statistical analysis of building damage from the 2013 Super Typhoon Haiyan and its storm surge in the Philippines',
    author_img_file_path: null,
    author_name: null,
    link: '',
    year: 2020,
    full_name:
      'Chaivutitorn, T., Tanasakcharoen, T., Leelawat, N., Tang, J., Caro, C. V. C., Lagmay, A. M. F. A., Suppasri, A., Bricker, J. D., Roeber, V., Yi, C. J., & Imamura, F. (2020). Statistical analysis of building damage from the 2013 Super Typhoon Haiyan and its storm surge in the Philippines. Journal of Disaster Research, 15 (7), 822-832. doi 10.20965/jdr.2020.p0822 (Scopus Q2)',
  },
  {
    id: 7,
    category_name: 'Natural Hazards and Earth System Sciences',
    img_file_path: '',
    view_count: null,
    title:
      'Investigating beach erosion related with tsunami sediment transport at Phra Thong Island, Thailand, caused by the 2004 Indian Ocean tsunami',
    author_img_file_path: null,
    author_name: null,
    link: '',
    year: 2020,
    full_name:
      'Masaya, R., Suppasri, A., Yamashita, K., Imamura, F., Gouramanis, C., & Leelawat, N. (2020). Investigating beach erosion related with tsunami sediment transport at Phra Thong Island, Thailand, caused by the 2004 Indian Ocean tsunami. Natural Hazards and Earth System Sciences, 20, 2823-2841. doi 10.5194/nhess-20-2823-2020 (ISI/Scopus Q1)',
  },
];

const allMemberArrTest = [
  // - id serial primary_key
  // - status text
  // - type text
  // - img_file_path text
  // - name text
  // - education_arr text[]
  // - profile_link_id_arr integer[]
  // - year integer
  {
    id: 1,
    status: 'current',
    type: 'member',
    img_file_path: 'member/natt.png',
    name: 'Associate Professor Natt Leelawat, D.Eng.',
    rank: 'Head of DRMIS',
    education_arr: [
      'D.Eng. (Industrial Engineering and Management), Tokyo Institute of Technology, Japan',
      'M.Eng. (Industrial Engineering and Management), Tokyo Institute of Technology, Japan',
      'B.Sc. (First Class Honours) (Information Technology), Sirindhorn International Institute of Technology, Thammasat University, Thailand',
    ],
    profile_link_id_arr: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    status: 'current',
    type: 'member',
    img_file_path: 'member/supattra.png',
    name: 'Assistant Professor Supattra Visessri, Ph.D.',
    rank: 'Deputy Head of DRMIS',
    education_arr: [
      'Ph.D. (Environmental and Water Resources Engineering), Imperial College of Science, Techology and Medicine London, UK',
      'M.Sc. (Hydrology and Business Management), Imperial College of Science, Technology and Medicine London, UK',
      'MBA (Interbusiness Management & Finance), Thammasat University, Thailand',
      'B.Eng. (Irrigation), Kasetsart Univesity, Thailand',
    ],
    profile_link_id_arr: [6, 7, 8, 9, 10],
  },
  {
    id: 3,
    status: 'current',
    type: 'member',
    img_file_path: 'member/prasert.png',
    name: 'Assistant Professor Prasert Akkharaprathomphong',
    rank: 'Faculty Member of DRMIS',
    education_arr: [
      'M.Eng. (Administration Engineering), Keio University, Japan',
      'B.Eng. (Industrial Engineering), Chulalongkorn University, Thailand',
    ],
    profile_link_id_arr: [11],
  },
  {
    id: 4,
    status: 'current',
    type: 'member',
    img_file_path: 'member/chatpan.png',
    name: 'Assistant Professor Chatpan Chintanapakdee, Ph.D.',
    rank: 'Faculty Member of DRMIS',
    education_arr: [
      'Ph.D. (Structural Engineering), University of California, Berkeley, USA',
      'M.S. (Structural Engineering), University of California, Berkeley, USA',
      'B.Eng. (Civil Engineering), Chulalongkorn University, Thailand',
    ],
    profile_link_id_arr: [12, 13, 14],
  },
  {
    id: 5,
    status: 'current',
    type: 'member',
    img_file_path: 'member/jing.png',
    name: 'Jing Tang, D.Eng.',
    rank: 'Faculty Member of DRMIS',
    education_arr: [
      'D.Eng. (Industrial Engineering and Management), Tokyo Institute of Technology, Japan',
      'M.Eng. (Industrial Engineering and Management), Tokyo Institute of Technology, Japan',
      "B.Mgmt. (Industrial Engineering), Xi'an Jiaotong, University, China",
      "B.Eng. (Computer Science and Technology), Xi'an Jiaotong University, China",
    ],
    profile_link_id_arr: [15, 16, 17, 18, 19],
  },
  {
    id: 6,
    status: 'current',
    type: 'visiting member',
    name: 'Professor Watanabe Kenji, Ph.D.',
    education_arr: ['Nagoya Institute of Technology, Japan'],
    profile_link_id_arr: [20, 21],
  },
  {
    id: 7,
    status: 'current',
    type: 'visiting member',
    name: 'Associate Professor Kodaka Akira, Ph.D.',
    education_arr: ['Keio University, Japan'],
    profile_link_id_arr: [22, 23, 24],
  },
  {
    id: 8,
    status: 'current',
    type: 'visiting member',
    name: 'Ampan Laosunthara',
    education_arr: ['Tokyo Institute of Technology, Japan'],
    profile_link_id_arr: [25, 26, 27],
  },
  {
    id: 9,
    status: 'current',
    type: 'visiting member',
    name: 'Kodchakorn Krutphong',
    education_arr: ['Mahidol University Kanchanaburi Campus, Thailand'],
    profile_link_id_arr: [28, 29],
  },
  { id: 10, status: 'current', type: 'graduate student', name: 'Mr. Alfan Kurnia Yudha', rank: 'Ph.D. student', profile_link_id_arr: [30] },
  { id: 11, status: 'current', type: 'graduate student', name: 'Mr. Wanit Treeranurat', rank: 'Ph.D. student' },
  {
    id: 12,
    status: 'current',
    type: 'graduate student',
    name: 'Mr. Kumpol Saengtabtim',
    rank: 'Ph.D. student',
    profile_link_id_arr: [31, 32, 33, 34],
  },
  { id: 13, status: 'current', type: 'graduate student', name: 'Ms. Piyaporn Sochoeiya', rank: "Master's student" },
  { id: 14, status: 'current', type: 'graduate student', name: 'Ms. Penpitcha Arayachookiat', rank: "Master's student" },
  { id: 15, status: 'current', type: 'graduate student', name: 'Mr. Anupong Wongposchanee', rank: "Master's student" },
  { id: 16, status: 'current', type: 'graduate student', name: 'Mr. Siribhop Yooyongchuen', rank: "Master's student" },
  { id: 17, status: 'current', type: 'graduate student', name: 'Mr. Teerapat Tappanom', rank: "Master's student" },
  { id: 18, status: 'current', type: 'graduate student', name: 'Ms. Manarush Chantanawichian', rank: "Master's student" },
  { id: 19, status: 'current', type: 'graduate student', name: 'Ms. Yaowapha Siripakarn', rank: "Master's student" },
  { id: 20, status: 'current', type: 'undergraduate student', name: 'Mr. Manapat Weeramongkolkul' },
  { id: 21, status: 'current', type: 'undergraduate student', name: 'Ms. Yada Vikraipaisarn' },
  { id: 22, status: 'current', type: 'undergraduate student', name: 'Ms. Kwansuang Ho' },
  { id: 23, status: 'current', type: 'undergraduate student', name: 'Mr. Pannaton Kerdkaewfah' },
  { id: 24, status: 'current', type: 'undergraduate student', name: 'Mr. Punn Damrongratnuwong' },
  { id: 25, status: 'current', type: 'undergraduate student', name: 'Mr. Bhunaron Sornklin' },
  { id: 26, status: 'current', type: 'undergraduate student', name: 'Mr. Puchong Traidalanon' },
  { id: 27, status: 'current', type: 'undergraduate student', name: 'Mr. Naphat Pattayanun' },
  { id: 28, status: 'current', type: 'undergraduate student', name: 'Ms. Supanida Suwankesawong' },
  { id: 29, status: 'current', type: 'undergraduate student', name: 'Mr. Methasit Chaweewongpaisal' },
  { id: 30, status: 'current', type: 'undergraduate student', name: 'Mr. Naphat Mahittikul' },
  { id: 31, status: 'current', type: 'undergraduate student', name: 'Mr. Nawat Wancham' },
  { id: 32, status: 'current', type: 'undergraduate student', name: 'Mr. Chitipat Trachu' },
  { id: 33, status: 'current', type: 'undergraduate student', name: 'Mr. Jeerapat Thansuwanwong' },
  { id: 34, status: 'current', type: 'undergraduate student', name: 'Mr. Nakrit Panjasanka' },
  { id: 35, status: 'current', type: 'undergraduate student', name: 'Mr. Kongpop Panya' },
  { id: 36, status: 'current', type: 'undergraduate student', name: 'Mr. Krit Uthaisang' },
  { id: 37, status: 'current', type: 'undergraduate student', name: 'Mr. Jomphat Itsarawisut' },
  { id: 38, status: 'alumni', type: 'master', name: 'Ms. Jeerawan Punwaree', year: 2021 },
  { id: 39, status: 'alumni', type: 'master', name: 'Ms. Kodchakorn Krutphong', year: 2021 },
  { id: 40, status: 'alumni', type: 'master', name: 'Ms. Treerat Patiko', year: 2021 },
  { id: 41, status: 'alumni', type: 'bachelor', name: 'Ms. Sirinda Leesuravanich', year: 2021 },
  { id: 42, status: 'alumni', type: 'bachelor', name: 'Ms. Supitcha Sopinpong', year: 2021 },
  { id: 43, status: 'alumni', type: 'bachelor', name: 'Mr. Gorn Perapalanunt', year: 2021 },
  { id: 44, status: 'alumni', type: 'bachelor', name: 'Mr. Sasinat Thiwathittayanuphap', year: 2021 },
  { id: 45, status: 'alumni', type: 'bachelor', name: 'Ms. Praewa Udomlertsakul', year: 2021 },
  { id: 46, status: 'alumni', type: 'bachelor', name: 'Mr. Chanakan Suksanon', year: 2021 },
  { id: 47, status: 'alumni', type: 'bachelor', name: 'Ms. Natcha Wongwattanakit', year: 2021 },
  { id: 48, status: 'alumni', type: 'bachelor', name: 'Mr. Chinnakrit Channok', year: 2021 },
  { id: 49, status: 'alumni', type: 'bachelor', name: 'Mr. Jirat Viriyataranon', year: 2021 },
  { id: 50, status: 'alumni', type: 'bachelor', name: 'Mr. Kantapat Pattarapremcharoen', year: 2021 },
  { id: 51, status: 'alumni', type: 'bachelor', name: 'Mr. Sithichon Duke', year: 2021 },
  { id: 52, status: 'alumni', type: 'bachelor', name: 'Mr. Kaweetip Charoenprawatt', year: 2021 },
  { id: 53, status: 'alumni', type: 'bachelor', name: 'Mr. Sorawit Chatchawanit', year: 2021 },
  { id: 54, status: 'alumni', type: 'bachelor', name: 'Mr. Bhumibhat Imsamran', year: 2021 },
  { id: 55, status: 'alumni', type: 'master', name: 'Mr. Kananut Charoenthammachoke', year: 2020 },
  { id: 56, status: 'alumni', type: 'master', name: 'Mr. Soonthorn Paopid', year: 2020 },
  { id: 57, status: 'alumni', type: 'master', name: 'Ms. Sansanee Sapapthai', year: 2020 },
  { id: 58, status: 'alumni', type: 'bachelor', name: 'Mr. Narin Kittiwattanakul', year: 2020 },
  { id: 59, status: 'alumni', type: 'bachelor', name: 'Mr. Thanapat Sontayasara', year: 2020 },
  { id: 60, status: 'alumni', type: 'bachelor', name: 'Mr. Natthadech Manichot', year: 2020 },
  { id: 61, status: 'alumni', type: 'bachelor', name: 'Mr. Puvit Pracharktam', year: 2020 },
  { id: 62, status: 'alumni', type: 'bachelor', name: 'Mr. Sirawit Jariyapongpaiboon', year: 2020 },
  { id: 63, status: 'alumni', type: 'bachelor', name: 'Mr. Arnon Promjun', year: 2020 },
  { id: 64, status: 'alumni', type: 'bachelor', name: 'Mr. Samit Boonyarak', year: 2020 },
  { id: 65, status: 'alumni', type: 'bachelor', name: 'Mr. Suwajo Chaichanasiri', year: 2020 },
  { id: 66, status: 'alumni', type: 'bachelor', name: 'Ms. Penpitchaya Lertsakornsiri', year: 2020 },
  { id: 67, status: 'alumni', type: 'bachelor', name: 'Ms. Passarawan Sritanawatkul', year: 2020 },
  { id: 68, status: 'alumni', type: 'bachelor', name: 'Ms. Rachadara Ussayakhun', year: 2020 },
  { id: 69, status: 'alumni', type: 'bachelor', name: 'Ms. Niracha Ariyamakkagul', year: 2020 },
  { id: 70, status: 'alumni', type: 'bachelor', name: 'Mr. Theerat Tassanai', year: 2020 },
  { id: 71, status: 'alumni', type: 'bachelor', name: 'Mr. Napatee Yaibuates', year: 2020 },
  { id: 72, status: 'alumni', type: 'internship', name: 'Mr. Sirawit Jariyapongpaiboon', year: 2020 },
  { id: 73, status: 'alumni', type: 'internship', name: 'Mr. Thanapat Sontayasara', year: 2020 },
  { id: 74, status: 'alumni', type: 'internship', name: 'Mr. Napat Seelpipat', year: 2020 },
  { id: 75, status: 'alumni', type: 'internship', name: 'Mr. Arnon Promjun', year: 2020 },
  { id: 76, status: 'alumni', type: 'internship', name: 'Mr. Suwajo Chaichanasiri', year: 2020 },
  { id: 77, status: 'alumni', type: 'master', name: 'Ms. Thitiporn Katato', year: 2019 },
  { id: 78, status: 'alumni', type: 'master', name: 'Ms. Kunruthai Meechang', year: 2019 },
  { id: 79, status: 'alumni', type: 'master', name: 'Mr. Hassakorn Rojpitinithikorn', year: 2019 },
  { id: 80, status: 'alumni', type: 'master', name: 'Mr. Phoom Traithateera', year: 2019 },
  { id: 81, status: 'alumni', type: 'bachelor', name: 'Ms. Varinthorn Puttiteerachot', year: 2019 },
  { id: 82, status: 'alumni', type: 'bachelor', name: 'Ms. Vivan Techakosol', year: 2019 },
  { id: 83, status: 'alumni', type: 'bachelor', name: 'Mr. Wanmai Phothavorn', year: 2019 },
  { id: 84, status: 'alumni', type: 'bachelor', name: 'Mr. Sivakorn Kamonpakorn', year: 2019 },
  { id: 85, status: 'alumni', type: 'bachelor', name: 'Mr. Pattanun Yongvibulsiri', year: 2019 },
  { id: 86, status: 'alumni', type: 'bachelor', name: 'Mr. Danoosit Techapetpaiboon', year: 2019 },
  { id: 87, status: 'alumni', type: 'bachelor', name: 'Mr. Chanakarn Luangpirom', year: 2019 },
  { id: 88, status: 'alumni', type: 'bachelor', name: 'Mr. Nithis Premsoontorn', year: 2019 },
  { id: 89, status: 'alumni', type: 'bachelor', name: 'Mr. Takol Kullavanijaya', year: 2019 },
  { id: 90, status: 'alumni', type: 'bachelor', name: 'Mr. Pon Karevachirapan', year: 2019 },
  { id: 91, status: 'alumni', type: 'bachelor', name: 'Mr. Nawapat Uswachaisilp', year: 2019 },
  { id: 92, status: 'alumni', type: 'bachelor', name: 'Mr. Noraphat Suwattananon', year: 2019 },
  { id: 93, status: 'alumni', type: 'bachelor', name: 'Ms. Suwara Sukhasem', year: 2019 },
  { id: 94, status: 'alumni', type: 'bachelor', name: 'Ms. Pasinee Rerkpiboon', year: 2019 },
  { id: 95, status: 'alumni', type: 'bachelor', name: 'Mr. Sarun Poolkrajang', year: 2019 },
  { id: 96, status: 'alumni', type: 'bachelor', name: 'Mr. Methasit Tuwawit', year: 2019 },
  { id: 97, status: 'alumni', type: 'bachelor', name: 'Mr. Supavit Srichareonkul', year: 2019 },
  { id: 98, status: 'alumni', type: 'bachelor', name: 'Mr. Satid Tachatanitanont', year: 2019 },
];

const memberProfileLinkArrTest = [
  //    - id serial primary_key
  //    - title text
  //    - link text
  { id: 1, title: 'ACM', link: 'https://dl.acm.org/profile/99659597258' },
  { id: 2, title: 'Google Scholar', link: 'https://scholar.google.com/citations?user=W_CbEh8AAAAJ' },
  { id: 3, title: 'IEEE', link: 'https://ieeexplore.ieee.org/author/37087098418' },
  { id: 4, title: 'ORCID', link: 'https://orcid.org/0000-0001-5181-2584' },
  { id: 5, title: 'Scopus', link: 'https://www.scopus.com/authid/detail.uri?authorId=57964954000' },
  { id: 6, title: 'ACM', link: 'https://dl.acm.org/profile/99659276773' },
  { id: 7, title: 'Google Scholar', link: 'https://scholar.google.com/citations?user=WJY-21EAAAAJ' },
  { id: 8, title: 'IEEE', link: 'https://ieeexplore.ieee.org/author/37086082476' },
  { id: 9, title: 'ORCID', link: 'https://orcid.org/0000-0003-1963-927X' },
  { id: 10, title: 'Scopus', link: 'https://www.scopus.com/authid/detail.uri?authorId=55207301200' },
  { id: 11, title: 'IEEE', link: 'https://ieeexplore.ieee.org/author/37086400297' },
  { id: 12, title: 'IEEE', link: 'https://ieeexplore.ieee.org/author/37088571456' },
  { id: 13, title: 'ORCID', link: 'https://orcid.org/0000-0002-5413-7454' },
  { id: 14, title: 'Scopus', link: 'https://www.scopus.com/authid/detail.uri?authorId=7801358941' },
  { id: 15, title: 'ACM', link: 'https://dl.acm.org/profile/99659607705' },
  { id: 16, title: 'Google Scholar', link: 'https://scholar.google.co.jp/citations?user=JPKLv18AAAAJ' },
  { id: 17, title: 'IEEEr', link: 'https://ieeexplore.ieee.org/author/37087094961' },
  { id: 18, title: 'ORCID', link: 'https://orcid.org/0000-0002-4835-1016' },
  { id: 19, title: 'Scopus', link: 'https://www.scopus.com/authid/detail.uri?authorId=57204003984' },
  { id: 20, title: 'IEEE', link: 'https://ieeexplore.ieee.org/author/37088569826' },
  { id: 21, title: 'Scopus', link: 'https://www.scopus.com/authid/detail.uri?authorId=55704900500' },
  { id: 22, title: 'ACM', link: 'https://dl.acm.org/profile/99659603458' },
  { id: 23, title: 'IEEE', link: 'https://ieeexplore.ieee.org/author/37086524828' },
  { id: 24, title: 'Scopus', link: 'https://www.scopus.com/authid/detail.uri?authorId=6507277945' },
  { id: 25, title: 'IEEE', link: 'https://ieeexplore.ieee.org/author/37085518018' },
  { id: 26, title: 'ORCID', link: 'https://orcid.org/0000-0003-0786-9270' },
  { id: 27, title: 'Scopus', link: 'https://www.scopus.com/authid/detail.uri?authorId=57192700626' },
  { id: 28, title: 'ORCID', link: 'https://orcid.org/0000-0001-9619-2163' },
  { id: 29, title: 'Scopus', link: 'https://www.scopus.com/authid/detail.uri?authorId=57288405600' },
  { id: 30, title: 'ORCID', link: 'https://orcid.org/0000-0002-1764-9493' },
  { id: 31, title: 'Google Scholar', link: 'https://scholar.google.com/citations?user=vTtEYCkAAAAJ' },
  { id: 32, title: 'IEEE', link: 'https://ieeexplore.ieee.org/author/37088759306' },
  { id: 33, title: 'ORCID', link: 'https://orcid.org/0000-0002-9890-6390' },
  { id: 34, title: 'Scopus', link: 'https://www.scopus.com/authid/detail.uri?authorId=57217047083' },
];

const recruitmentArrTest = [
  // - id serial primary_key
  // - poster text
  // - title text
  // - number integer
  // - period text
  // - contact text
  {
    id: 1,
    poster_file_path: 'recruitment/recruitment-poster.png',
    title: 'Call of Postdoctoral Researcher',
    number: 1,
    period: '12 months (able to renew)',
    contact: 'natt.l@chula.ac.th',
  },
];

const activityArrTest = [
  // - id serial primary_key
  // - poster text
  // - title text
  // - link text
  {
    id: 1,
    poster_file_path: 'activity/activity-poster-2.png',
    title: '',
    link: '',
  },
  {
    id: 2,
    poster_file_path: 'activity/activity-poster-1.png',
    title: '',
    link: '',
  },
  {
    id: 3,
    poster_file_path: 'activity/activity-poster-3.png',
    title: 'Free Online Lecture Series in the “Emergency Management Workshop',
    link: 'https://www.eng.chula.ac.th/en/30896',
  },
  {
    id: 4,
    poster_file_path: 'activity/activity-poster-4.png',
    title:
      'Association of Pacific Rim Universities (APRU) published the Universities’ Preparedness and Response Towards Multi-Hazards: COVID-19, Natural, and Human-Induced Hazards',
    link: 'https://www.eng.chula.ac.th/en/30654',
  },
];

const homeImageArrTest = [
  // - id integer
  // - file_path text
  {
    id: 1,
    file_path: '',
  },
  {
    id: 2,
    file_path: '',
  },
  {
    id: 3,
    file_path: '',
  },
  {
    id: 4,
    file_path: '',
  },
  {
    id: 5,
    file_path: '',
  },
];

const studentImageArrTest = [
  // - id integer
  // - file_path text
  {
    id: 1,
    file_path: 'student-image/member-graduate-students.png',
  },
  {
    id: 2,
    file_path: 'student-image/member-undergraduate-students.png',
  },
];

const resourceSlice = createSlice({
  name: 'resource',
  initialState: {
    researchPublicationArr: [],
    projectArr: [],
    allMemberArr: [],
    memberProfileLinkArr: [],
    recruitmentArr: [],
    activityArr: [],
    homeImageArr: [],
    studentImageArr: [],
  },
  reducers: {
    setResearchPublicationArr(state, action) {
      state.researchPublicationArr = action.payload || researchPublicationArrTest;
    },
    setProjectArr(state, action) {
      state.projectArr = action.payload || projectArrTest;
    },
    setAllMember(state, action) {
      state.allMemberArr = action.payload || allMemberArrTest;
    },
    setMemberProfileLinkArr(state, action) {
      state.memberProfileLinkArr = action.payload || memberProfileLinkArrTest;
    },
    setRecruitmentArr(state, action) {
      state.recruitmentArr = action.payload || recruitmentArrTest;
    },
    setActivityArr(state, action) {
      state.activityArr = action.payload || activityArrTest;
    },
    setHomeImageArr(state, action) {
      state.homeImageArr = action.payload || homeImageArrTest;
    },
    setStudentImageArr(state, action) {
      state.studentImageArr = action.payload || studentImageArrTest;
    },
  },
});

export const resourceActions = resourceSlice.actions;
export default resourceSlice.reducer;
