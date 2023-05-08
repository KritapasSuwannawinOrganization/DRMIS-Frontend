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
    view_count: 100,
    title:
      'Simulation Development of the Affected Industrial Supply Chain from the COVID-19 Applying the Area-Business Continuity Management (Area-BCM) Concept',
    author_img_file_path: '',
    author_name: 'Michele Morrone',
    link: 'https://google.com',
    collaboration: '',
    scope: '',
    funder: 'Thailand Science Research and Innovation Fund, Chulalongkorn University',
    start_date: 'October 2021',
    end_date: 'September 2022',
    description: 'Fundamental Fund (FF) (CU_FRB65_dis(22)_147_21_13)',
  },
  {
    id: 2,
    category_name: 'Area-BCM',
    img_file_path: '',
    view_count: 100,
    title: 'Sustainable Healthcare System through Business Continuity Management',
    author_img_file_path: '',
    author_name: 'Michele Morrone',
    link: 'https://google.com',
    collaboration: 'Chulalongkorn University and Jomo Kenyatta University Agriculture and Technology',
    scope: '',
    funder: 'JICA Project for AUN/SEED-Net',
    start_date: 'May 2021',
    end_date: 'February 2022',
    description: 'Collaborative Research with External Partners (CRX) (CU CRX 2102)',
  },
  {
    id: 3,
    category_name: 'Area-BCM',
    img_file_path: '',
    view_count: 100,
    title: 'COVID-19 Data Analysis Using Mobile Services Data and Satellite Geospatial Data Towards Sustainable Tourism Business',
    author_img_file_path: '',
    author_name: 'Michele Morrone',
    link: 'https://google.com',
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
    category_name: 'Area-BCM',
    img_file_path: '',
    view_count: 100,
    title: 'Area-Business Continuity Management',
    author_img_file_path: '',
    author_name: 'Michele Morrone',
    link: 'https://google.com',
    year: 2022,
    full_name:
      'Tang, J., Vinayavekhin, S., Weeramongkolkul, M., Suksanon, C., Pattarapremcharoen, K., Thiwathittayanuphap, S., & Leelawat, N. (2022). Agent-based simulation and modeling of COVID-19 pandemic: A bibliometric analysis. Journal of Disaster Research, 17 (1), 93-102. doi: 10.20965/jdr.2022.p0093 (Scopus Q2)',
  },
  {
    id: 2,
    category_name: 'Area-BCM',
    img_file_path: '',
    view_count: 100,
    title: 'Area-Business Continuity Management',
    author_img_file_path: '',
    author_name: 'Michele Morrone',
    link: 'https://google.com',
    year: 2022,
    full_name:
      'Kodaka, A., Detera, B. J., Onda, Y., Leelawat, N., Tang, J., Laosunthara, A., Saengtabtim, K., & Kohtake, N. (2022). Interventions to support tourism and its impact on air quality – A case study of the Go To Travel campaign in Japan –. Journal of Disaster Research, 17 (1), 123-135. doi: 10.20965/jdr.2022.p0123 (Scopus Q2)',
  },
  {
    id: 3,
    category_name: 'Area-BCM',
    img_file_path: '',
    view_count: 100,
    title: 'Area-Business Continuity Management',
    author_img_file_path: '',
    author_name: 'Michele Morrone',
    link: 'https://google.com',
    year: 2021,
    full_name:
      'Leelawat, N., & Vilaivan, T. (2021). A polystyrene foam factory fire in a Bangkok satellite city: Incident and lessons learned. ACS Chemical Health & Safety, 28 (6), 394-396. doi: 10.1021/acs.chas.1c00071',
  },
  {
    id: 4,
    category_name: 'Area-BCM',
    img_file_path: '',
    view_count: 100,
    title: 'Area-Business Continuity Management',
    author_img_file_path: '',
    author_name: 'Michele Morrone',
    link: 'https://google.com',
    year: 2021,
    full_name:
      'Leelawat, N., Tang, J., Krutphong, K., Chaichanasiri, S., Kanno, T., Li, C. W., Le, L. T. Q., Dung, H. Q., Saengtabtim, K., & Laosunthara, A. (2021). Comparison of the initial overseas evacuation operations due to COVID-19: A focus on Asian countries. Journal of Disaster Research, 16 (7), 1137-1146. doi: 10.20965/jdr.2021.p1137 (Scopus Q2)',
  },
  {
    id: 5,
    category_name: 'Area-BCM',
    img_file_path: '',
    view_count: 100,
    title: 'Area-Business Continuity Management',
    author_img_file_path: '',
    author_name: 'Michele Morrone',
    link: 'https://google.com',
    year: 2021,
    full_name:
      'Leelawat, N., Laosunthara, A., Tang, J., Suppasri, A., Ruangrassamee, A., Akkharaprathompong, P., & Imamura, F. (2021). The 2011 Great East Japan earthquake and tsunami: A message from Japan to Thailand. Journal of Disaster Research, 16 (6), 908-913. doi: 10.20965/jdr.2021.p0908 (Scopus Q2)',
  },
  {
    id: 6,
    category_name: 'Area-BCM',
    img_file_path: '',
    view_count: 100,
    title: 'Area-Business Continuity Management',
    author_img_file_path: '',
    author_name: 'Michele Morrone',
    link: 'https://google.com',
    year: 2020,
    full_name:
      'Chaivutitorn, T., Tanasakcharoen, T., Leelawat, N., Tang, J., Caro, C. V. C., Lagmay, A. M. F. A., Suppasri, A., Bricker, J. D., Roeber, V., Yi, C. J., & Imamura, F. (2020). Statistical analysis of building damage from the 2013 Super Typhoon Haiyan and its storm surge in the Philippines. Journal of Disaster Research, 15 (7), 822-832. doi 10.20965/jdr.2020.p0822 (Scopus Q2)',
  },
  {
    id: 7,
    category_name: 'Area-BCM',
    img_file_path: '',
    view_count: 100,
    title: 'Area-Business Continuity Management',
    author_img_file_path: '',
    author_name: 'Michele Morrone',
    link: 'https://google.com',
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
  // - publication_id_arr integer[]
  // - year integer
  {
    id: 1,
    status: 'current',
    type: 'member',
    img_file_path: '',
    name: 'Associate Professor Natt Leelawat, D.Eng.',
    rank: 'Head of DRMIS',
    education_arr: [
      'D.Eng. (Industrial Engineering and Management), Tokyo Institute of Technology, Japan',
      'M.Eng. (Industrial Engineering and Management), Tokyo Institute of Technology, Japan',
      'B.Sc. (First Class Honours) (Information Technology), Sirindhorn International Institute of Technology, Thammasat University, Thailand',
    ],
    publication_id_arr: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    status: 'current',
    type: 'member',
    img_file_path: '',
    name: 'Assistant Professor Supattra Visessri, Ph.D.',
    rank: 'Deputy Head of DRMIS',
    education_arr: [
      'Ph.D. (Environmental and Water Resources Engineering), Imperial College of Science, Techology and Medicine London, UK',
      'M.Sc. (Hydrology and Business Management), Imperial College of Science, Technology and Medicine London, UK',
      'MBA (Interbusiness Management & Finance), Thammasat University, Thailand',
      'B.Eng. (Irrigation), Kasetsart Univesity, Thailand',
    ],
    publication_id_arr: [6, 7, 8, 9, 10],
  },
  {
    id: 3,
    status: 'current',
    type: 'member',
    img_file_path: '',
    name: 'Assistant Professor Prasert Akkharaprathomphong',
    rank: 'Faculty Member of DRMIS',
    education_arr: [
      'D.Eng. (Industrial Engineering and Management), Tokyo Institute of Technology, Japan',
      'M.Eng. (Industrial Engineering and Management), Tokyo Institute of Technology, Japan',
      'B.Sc. (First Class Honours) (Information Technology), Sirindhorn International Institute of Technology, Thammasat University, Thailand',
    ],
    publication_id_arr: [11, 12, 13],
  },
  {
    id: 4,
    status: 'current',
    type: 'member',
    img_file_path: '',
    name: 'Assistant Professor Chatpan Chintanapakdee, Ph.D.',
    rank: 'Faculty Member of DRMIS',
    education_arr: [
      'Ph.D. (Environmental and Water Resources Engineering), Imperial College of Science, Techology and Medicine London, UK',
      'M.Sc. (Hydrology and Business Management), Imperial College of Science, Technology and Medicine London, UK',
      'MBA (Interbusiness Management & Finance), Thammasat University, Thailand',
      'B.Eng. (Irrigation), Kasetsart Univesity, Thailand',
    ],
    publication_id_arr: [14, 15],
  },
  {
    id: 5,
    status: 'current',
    type: 'member',
    img_file_path: '',
    name: 'Jing Tang, D.Eng.',
    rank: 'Faculty Member of DRMIS',
    education_arr: [
      'D.Eng. (Industrial Engineering and Management), Tokyo Institute of Technology, Japan',
      'M.Eng. (Industrial Engineering and Management), Tokyo Institute of Technology, Japan',
      'B.Sc. (First Class Honours) (Information Technology), Sirindhorn International Institute of Technology, Thammasat University, Thailand',
    ],
    publication_id_arr: [16, 17, 18, 19, 20],
  },
  {
    id: 6,
    status: 'current',
    type: 'visiting member',
    name: 'Professor Watanabe Kenji, Ph.D.',
    education_arr: ['Nagoya Institute of Technology, Japan'],
    publication_id_arr: [16, 17, 18, 19, 20],
  },
  {
    id: 7,
    status: 'current',
    type: 'visiting member',
    img_file_path: '',
    name: 'Project Associate Professor Kodaka Akira, Ph.D.',
    education_arr: ['Keio University, Japan'],
    publication_id_arr: [16, 20],
  },
  {
    id: 8,
    status: 'current',
    type: 'visiting member',
    name: 'Ampan Laosunthara',
    education_arr: ['Tokyo Institute of Technology, Japan'],
    publication_id_arr: [16, 17, 18, 20],
  },
  {
    id: 9,
    status: 'current',
    type: 'visiting member',
    name: 'Kodchakorn Krutphong',
    education_arr: ['Mahidol University Kanchanaburi Campus, Thailand'],
    publication_id_arr: [16, 19, 20],
  },
  {
    id: 10,
    status: 'current',
    type: 'graduate student',
    name: 'Mr. Alfan Kurnia Yudha',
    rank: 'Ph.D. student',
  },
  {
    id: 11,
    status: 'current',
    type: 'graduate student',
    name: 'Mr. Alfan Kurnia Yudha',
    rank: 'Ph.D. student',
    publication_id_arr: [16, 20],
  },
  {
    id: 12,
    status: 'current',
    type: 'graduate student',
    name: 'Mr. Alfan Kurnia Yudha',
    rank: 'Ph.D. student',
  },
  {
    id: 13,
    status: 'current',
    type: 'graduate student',
    name: 'Mr. Alfan Kurnia Yudha',
    rank: "Master's student",
  },
  {
    id: 14,
    status: 'current',
    type: 'graduate student',
    name: 'Mr. Alfan Kurnia Yudha',
    rank: "Master's student",
    publication_id_arr: [16, 19, 20],
  },
  {
    id: 15,
    status: 'current',
    type: 'undergraduate student',
    name: 'Mr. Alfan Kurnia Yudha',
  },
  {
    id: 16,
    status: 'current',
    type: 'undergraduate student',
    name: 'Mr. Alfan Kurnia Yudha',
  },
  {
    id: 17,
    status: 'current',
    type: 'undergraduate student',
    name: 'Mr. Alfan Kurnia Yudha',
  },
  {
    id: 18,
    status: 'current',
    type: 'undergraduate student',
    name: 'Mr. Alfan Kurnia Yudha',
  },
  {
    id: 19,
    status: 'current',
    type: 'undergraduate student',
    name: 'Mr. Alfan Kurnia Yudha',
  },
  {
    id: 20,
    status: 'current',
    type: 'undergraduate student',
    name: 'Mr. Alfan Kurnia Yudha',
  },
  {
    id: 21,
    status: 'alumni',
    type: 'master',
    name: 'Ms. Jeerawan Punwaree',
    year: 2021,
  },
  {
    id: 22,
    status: 'alumni',
    type: 'master',
    name: 'Ms. Jeerawan Punwaree',
    year: 2021,
  },
  {
    id: 23,
    status: 'alumni',
    type: 'master',
    name: 'Ms. Jeerawan Punwaree',
    year: 2021,
  },
  {
    id: 24,
    status: 'alumni',
    type: 'bachelor',
    name: 'Ms. Sirinda Leesuravanich',
    year: 2021,
  },
  {
    id: 25,
    status: 'alumni',
    type: 'bachelor',
    name: 'Ms. Sirinda Leesuravanich',
    year: 2021,
  },
  {
    id: 26,
    status: 'alumni',
    type: 'bachelor',
    name: 'Ms. Sirinda Leesuravanich',
    year: 2021,
  },
  {
    id: 27,
    status: 'alumni',
    type: 'bachelor',
    name: 'Ms. Sirinda Leesuravanich',
    year: 2021,
  },
  {
    id: 28,
    status: 'alumni',
    type: 'bachelor',
    name: 'Ms. Sirinda Leesuravanich',
    year: 2021,
  },
  {
    id: 29,
    status: 'alumni',
    type: 'bachelor',
    name: 'Ms. Sirinda Leesuravanich',
    year: 2021,
  },
  {
    id: 30,
    status: 'alumni',
    type: 'master',
    name: 'Mr. Kananut Charoenthammachoke',
    year: 2020,
  },
  {
    id: 31,
    status: 'alumni',
    type: 'master',
    name: 'Mr. Kananut Charoenthammachoke',
    year: 2020,
  },
  {
    id: 32,
    status: 'alumni',
    type: 'master',
    name: 'Mr. Kananut Charoenthammachoke',
    year: 2020,
  },
  {
    id: 33,
    status: 'alumni',
    type: 'bachelor',
    name: 'Mr. Narin Kittiwattanakul',
    year: 2020,
  },
  {
    id: 34,
    status: 'alumni',
    type: 'bachelor',
    name: 'Mr. Narin Kittiwattanakul',
    year: 2020,
  },
  {
    id: 35,
    status: 'alumni',
    type: 'bachelor',
    name: 'Mr. Narin Kittiwattanakul',
    year: 2020,
  },
  {
    id: 36,
    status: 'alumni',
    type: 'bachelor',
    name: 'Mr. Narin Kittiwattanakul',
    year: 2020,
  },
  {
    id: 37,
    status: 'alumni',
    type: 'bachelor',
    name: 'Mr. Narin Kittiwattanakul',
    year: 2020,
  },
  {
    id: 38,
    status: 'alumni',
    type: 'bachelor',
    name: 'Mr. Narin Kittiwattanakul',
    year: 2020,
  },
  {
    id: 39,
    status: 'alumni',
    type: 'internship',
    name: 'Mr. Sirawit Jariyapongpaiboon',
    year: 2020,
  },
  {
    id: 40,
    status: 'alumni',
    type: 'internship',
    name: 'Mr. Sirawit Jariyapongpaiboon',
    year: 2020,
  },
  {
    id: 41,
    status: 'alumni',
    type: 'internship',
    name: 'Mr. Sirawit Jariyapongpaiboon',
    year: 2020,
  },
];

const memberPublicationArrTest = [
  //    - id serial primary_key
  //    - title text
  //    - link text
  { id: 1, title: 'ACM', link: 'https://google.com' },
  { id: 2, title: 'Google Scholar', link: 'https://google.com' },
  { id: 3, title: 'IEEE', link: 'https://google.com' },
  { id: 4, title: 'ORCID', link: 'https://google.com' },
  { id: 5, title: 'Scopus', link: 'https://google.com' },
  { id: 6, title: 'ACM', link: 'https://google.com' },
  { id: 7, title: 'Google Scholar', link: 'https://google.com' },
  { id: 8, title: 'IEEE', link: 'https://google.com' },
  { id: 9, title: 'ORCID', link: 'https://google.com' },
  { id: 10, title: 'Scopus', link: 'https://google.com' },
  { id: 11, title: 'ACM', link: 'https://google.com' },
  { id: 12, title: 'Google Scholar', link: 'https://google.com' },
  { id: 13, title: 'IEEE', link: 'https://google.com' },
  { id: 14, title: 'ORCID', link: 'https://google.com' },
  { id: 15, title: 'Scopus', link: 'https://google.com' },
  { id: 16, title: 'ACM', link: 'https://google.com' },
  { id: 17, title: 'Google Scholar', link: 'https://google.com' },
  { id: 18, title: 'IEEE', link: 'https://google.com' },
  { id: 19, title: 'ORCID', link: 'https://google.com' },
  { id: 20, title: 'Scopus', link: 'https://google.com' },
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
    poster: '/static/media/recruitment-poster.b2c69ae1db7c59224d8e.png',
    title: 'Call of Postdoctoral Researcher',
    number: 1,
    period: '12 months (able to renew)',
    contact: 'natt.l@chula.ac.th',
  },
];

const resourceSlice = createSlice({
  name: 'resource',
  initialState: { researchPublicationArr: [], projectArr: [], allMemberArr: [], memberPublicationArr: [], recruitmentArr: [] },
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
    setMemberPublicationArr(state, action) {
      state.memberPublicationArr = action.payload || memberPublicationArrTest;
    },
    setRecruitmentArr(state, action) {
      state.recruitmentArr = action.payload || recruitmentArrTest;
    },
  },
});

export const resourceActions = resourceSlice.actions;
export default resourceSlice.reducer;
