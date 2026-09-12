
CREATE TABLE public.expeditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  code text NOT NULL,
  region text NOT NULL,
  year integer NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  platform text NOT NULL,
  themes text[] NOT NULL DEFAULT '{}',
  summary text NOT NULL,
  leader text NOT NULL,
  team_size integer NOT NULL DEFAULT 0,
  highlights text[] NOT NULL DEFAULT '{}',
  route_stops jsonb NOT NULL DEFAULT '[]'::jsonb,
  image_key text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.expeditions TO anon, authenticated;
GRANT ALL ON public.expeditions TO service_role;
ALTER TABLE public.expeditions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Expeditions are publicly readable" ON public.expeditions FOR SELECT USING (true);

CREATE TABLE public.repository_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  item_type text NOT NULL,
  year integer NOT NULL,
  theme text NOT NULL,
  authors text NOT NULL DEFAULT '',
  abstract text NOT NULL DEFAULT '',
  reference text NOT NULL DEFAULT '',
  file_format text NOT NULL DEFAULT 'PDF',
  file_size text NOT NULL DEFAULT '',
  expedition_slug text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.repository_items TO anon, authenticated;
GRANT ALL ON public.repository_items TO service_role;
ALTER TABLE public.repository_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Repository items are publicly readable" ON public.repository_items FOR SELECT USING (true);

CREATE TABLE public.media_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  kind text NOT NULL,
  caption text NOT NULL DEFAULT '',
  credit text NOT NULL DEFAULT '',
  theme text NOT NULL DEFAULT '',
  captured_on date,
  duration text,
  image_key text,
  expedition_slug text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media_items TO anon, authenticated;
GRANT ALL ON public.media_items TO service_role;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Media items are publicly readable" ON public.media_items FOR SELECT USING (true);

CREATE TABLE public.activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  activity_type text NOT NULL,
  starts_on date NOT NULL,
  ends_on date,
  location text NOT NULL DEFAULT '',
  audience text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.activities TO anon, authenticated;
GRANT ALL ON public.activities TO service_role;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Activities are publicly readable" ON public.activities FOR SELECT USING (true);

CREATE TABLE public.outreach_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL,
  source_title text NOT NULL,
  audience text NOT NULL,
  tone text NOT NULL,
  social_posts text NOT NULL DEFAULT '',
  press_note text NOT NULL DEFAULT '',
  newsletter text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.outreach_drafts TO anon, authenticated;
GRANT ALL ON public.outreach_drafts TO service_role;
ALTER TABLE public.outreach_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Outreach drafts are publicly readable" ON public.outreach_drafts FOR SELECT USING (true);
CREATE POLICY "Anyone can save an outreach draft" ON public.outreach_drafts FOR INSERT WITH CHECK (true);

INSERT INTO public.expeditions (slug, name, code, region, year, start_date, end_date, platform, themes, summary, leader, team_size, highlights, route_stops, image_key) VALUES
('isea-2024-antarctic-42','42nd Indian Scientific Expedition to Antarctica','ISEA-42','Antarctic',2024,'2023-11-14','2024-04-02','Maitri & Bharati Stations','{"Glaciology","Atmospheric Science","Polar Biology"}','A full-season campaign across Maitri and Bharati stations covering ice-sheet mass balance, aerosol chemistry and coastal ecosystem monitoring, with a winter-over team of 24 remaining through the austral night.','Dr. Ananya Rao',68,'{"Recovered a 210 m ice core from the Larsemann Hills catchment","Installed three new automatic weather stations along the Princess Elizabeth coast","First continuous year-round aerosol record from Bharati"}','[{"name":"Cape Town","note":"Staging and cargo consolidation"},{"name":"Maitri Station","note":"Schirmacher Oasis base operations"},{"name":"Larsemann Hills","note":"Ice core drilling camp"},{"name":"Bharati Station","note":"Coastal ecology and aerosol observatory"}]','ice-shelf'),
('iare-2025-arctic-summer','Indian Arctic Expedition — Summer Campaign 2025','IARE-2025S','Arctic',2025,'2025-06-05','2025-09-18','Himadri Station, Ny-Ålesund','{"Atmospheric Science","Fjord Ecology","Cryosphere"}','Summer occupation of Himadri focused on Kongsfjorden water-column sampling, black carbon deposition and permafrost active-layer monitoring across the Brøgger peninsula.','Dr. Vikram Shetty',22,'{"Longest continuous Kongsfjorden CTD series to date","Deployed an autonomous black carbon analyser at Zeppelin ridge","Mapped active-layer thaw depth at 40 permanent plots"}','[{"name":"Longyearbyen","note":"Arrival and logistics"},{"name":"Ny-Ålesund","note":"Himadri Station base"},{"name":"Kongsfjorden","note":"Water column and sediment stations"},{"name":"Brøgger Peninsula","note":"Permafrost transects"}]','arctic-fjord'),
('sore-2024-08','Southern Ocean Research Expedition — Leg 8','SORE-08','Southern Ocean',2024,'2024-01-08','2024-03-21','ORV Sagar Nidhi','{"Oceanography","Marine Biogeochemistry","Krill Ecology"}','A 73-day cruise sampling the Indian sector of the Southern Ocean, occupying 46 hydrographic stations across the Polar Front and deploying six Argo floats.','Dr. Meera Krishnan',41,'{"46 full-depth CTD stations across three frontal zones","Six Argo floats deployed under the national float programme","Continuous underway pCO2 record from 30S to 66S"}','[{"name":"Chennai","note":"Departure and mobilisation"},{"name":"Subtropical Front","note":"Transect stations 1-12"},{"name":"Polar Front","note":"Intensive biogeochemical sampling"},{"name":"Prydz Bay approach","note":"Southernmost station occupation"}]','southern-ocean'),
('himansh-2025','Himansh Glaciological Campaign 2025','HIM-2025','Himalaya',2025,'2025-05-02','2025-10-11','Himansh Station, Chandra Basin','{"Glaciology","Hydrology","Remote Sensing"}','Third-pole mass balance work in the Chandra basin combining stake networks, discharge gauging and UAV photogrammetry across seven benchmark glaciers.','Dr. Kabir Nandy',18,'{"Seven benchmark glaciers surveyed by UAV photogrammetry","Continuous discharge record at four proglacial gauges","Snowline retreat quantified against a 12-year baseline"}','[{"name":"Manali","note":"Road head and acclimatisation"},{"name":"Himansh Station","note":"High-altitude research base"},{"name":"Sutri Dhaka Glacier","note":"Stake network and ablation survey"},{"name":"Batal","note":"Proglacial discharge gauging"}]','himalaya'),
('isea-2023-antarctic-41','41st Indian Scientific Expedition to Antarctica','ISEA-41','Antarctic',2023,'2022-11-20','2023-03-30','Maitri & Bharati Stations','{"Geology","Polar Biology","Space Weather"}','Station resupply and science season emphasising Precambrian geology of the Schirmacher Oasis, penguin colony census and ionospheric monitoring.','Dr. Sunita Bhalla',62,'{"Census of four Adélie penguin colonies","Structural mapping of the Schirmacher gneiss belt","Upgraded ionospheric sounder at Maitri"}','[{"name":"Cape Town","note":"Air bridge staging"},{"name":"Maitri Station","note":"Geology and space weather"},{"name":"Bharati Station","note":"Penguin colony surveys"}]','station-night'),
('iare-2024-arctic-winter','Indian Arctic Expedition — Winter Campaign 2024','IARE-2024W','Arctic',2024,'2024-01-12','2024-03-28','Himadri Station, Ny-Ålesund','{"Atmospheric Science","Aurora Studies"}','A rare winter occupation capturing polar night atmospheric chemistry, auroral optical observations and sea-ice growth records.','Dr. Ritu Menon',12,'{"Polar night aerosol chemistry dataset","All-sky auroral camera commissioned","Weekly sea-ice thickness transects"}','[{"name":"Longyearbyen","note":"Winter transit"},{"name":"Ny-Ålesund","note":"Polar night operations"}]','aurora'),
('sore-2023-07','Southern Ocean Research Expedition — Leg 7','SORE-07','Southern Ocean',2023,'2023-01-15','2023-03-19','ORV Sagar Nidhi','{"Oceanography","Atmospheric Science"}','Repeat hydrography along the 57E meridional line with an emphasis on Antarctic Bottom Water properties and marine boundary layer aerosols.','Dr. Meera Krishnan',38,'{"Repeat occupation of the 57E hydrographic line","Bottom water property changes quantified since 2016","Shipboard aerosol sampling across the frontal system"}','[{"name":"Port Louis","note":"Mobilisation"},{"name":"57E Line","note":"Repeat hydrography"},{"name":"Antarctic shelf break","note":"Bottom water sampling"}]','ship-deck'),
('isea-2025-antarctic-43','43rd Indian Scientific Expedition to Antarctica','ISEA-43','Antarctic',2025,'2024-11-10','2025-04-06','Maitri & Bharati Stations','{"Cryosphere","Microbiology","Renewable Energy"}','Ongoing season trialling a hybrid renewable power module at Maitri alongside subglacial lake microbiology and blue-ice meteorite prospecting.','Dr. Ananya Rao',71,'{"Hybrid wind-solar module powering 30 percent of Maitri load","Subglacial brine microbial community sampled","19 meteorite fragments recovered from blue-ice fields"}','[{"name":"Cape Town","note":"Staging"},{"name":"Maitri Station","note":"Energy trial and microbiology"},{"name":"Blue-ice fields","note":"Meteorite prospecting traverse"},{"name":"Bharati Station","note":"Coastal monitoring handover"}]','blue-ice');

INSERT INTO public.repository_items (title, item_type, year, theme, authors, abstract, reference, file_format, file_size, expedition_slug) VALUES
('ISEA-42 Consolidated Scientific Report','report',2024,'Multidisciplinary','Rao A., Shetty V., Bhalla S.','Season-wide account of all twelve science programmes executed during the 42nd expedition, including station logistics, instrument commissioning and preliminary results.','SIH/REP/2024/042','PDF','18.4 MB','isea-2024-antarctic-42'),
('Larsemann Hills Ice Core Stratigraphy Dataset','dataset',2024,'Glaciology','Rao A., Pillai D.','Depth-resolved density, dust and stable isotope measurements from the 210 m Larsemann Hills core at 5 cm resolution.','SIH/DAT/2024/011','NetCDF','412 MB','isea-2024-antarctic-42'),
('Aerosol optical depth variability over Bharati Station','publication',2024,'Atmospheric Science','Menon R., Rao A., Iyer S.','Twelve months of continuous sun photometer observations reveal a distinct late-summer aerosol maximum linked to coastal open-water fetch.','J. Polar Atmos. Sci. 18(3), 221-238','PDF','4.1 MB','isea-2024-antarctic-42'),
('Kongsfjorden Hydrography 2025 Station Data','dataset',2025,'Oceanography','Shetty V., Das P.','CTD, nutrient and chlorophyll profiles from 64 stations occupied across Kongsfjorden during the 2025 summer campaign.','SIH/DAT/2025/006','CSV','86 MB','iare-2025-arctic-summer'),
('IARE Summer 2025 Field Report','report',2025,'Multidisciplinary','Shetty V.','Operational and scientific summary of the Himadri summer occupation, with instrument status and data availability tables.','SIH/REP/2025/018','PDF','9.7 MB','iare-2025-arctic-summer'),
('Black carbon deposition on Svalbard snowpack','publication',2025,'Atmospheric Science','Das P., Shetty V.','Snowpit sampling across the Brøgger peninsula quantifies black carbon loading and its radiative implication for spring melt onset.','Atmos. Environ. Polar 61, 104-119','PDF','6.3 MB','iare-2025-arctic-summer'),
('SORE-08 Hydrographic Station Dataset','dataset',2024,'Oceanography','Krishnan M., Varma T.','Full-depth temperature, salinity, oxygen and nutrient data from 46 stations across the Indian sector of the Southern Ocean.','SIH/DAT/2024/021','NetCDF','1.2 GB','sore-2024-08'),
('Underway surface pCO2 along 30S-66S','dataset',2024,'Marine Biogeochemistry','Varma T., Krishnan M.','One-minute underway partial pressure of carbon dioxide, sea surface temperature and salinity for the full SORE-08 cruise track.','SIH/DAT/2024/022','CSV','240 MB','sore-2024-08'),
('Krill distribution shifts across the Polar Front','publication',2024,'Polar Biology','Krishnan M., Joseph L.','Acoustic and net-based estimates indicate a poleward contraction of Euphausia superba aggregations relative to the 2011-2016 baseline.','Southern Ocean Biol. 9(2), 55-74','PDF','7.8 MB','sore-2024-08'),
('Chandra Basin Glacier Mass Balance 2015-2025','dataset',2025,'Glaciology','Nandy K., Sharma R.','Decadal annual mass balance series for seven benchmark glaciers with stake-level measurements and uncertainty estimates.','SIH/DAT/2025/014','CSV','38 MB','himansh-2025'),
('Himansh Station Decadal Glaciology Report','report',2025,'Glaciology','Nandy K.','Ten-year synthesis of Chandra basin glaciological observations including snowline, discharge and UAV-derived surface elevation change.','SIH/REP/2025/024','PDF','22.9 MB','himansh-2025'),
('UAV photogrammetry for high-altitude glacier monitoring','publication',2025,'Remote Sensing','Sharma R., Nandy K.','A repeatable low-cost UAV workflow achieves sub-decimetre surface elevation change detection on debris-covered Himalayan glaciers.','Cryosphere Methods 7(1), 12-31','PDF','11.2 MB','himansh-2025'),
('ISEA-41 Consolidated Scientific Report','report',2023,'Multidisciplinary','Bhalla S.','Full season report of the 41st expedition covering geology, biology, space weather and station engineering programmes.','SIH/REP/2023/039','PDF','16.1 MB','isea-2023-antarctic-41'),
('Adélie penguin colony census, Larsemann Hills','dataset',2023,'Polar Biology','Joseph L., Bhalla S.','Nest counts, breeding success and colony boundary polygons for four Adélie colonies surveyed during the 2022-23 season.','SIH/DAT/2023/009','CSV','12 MB','isea-2023-antarctic-41'),
('Structural evolution of the Schirmacher gneiss belt','publication',2023,'Geology','Bhalla S., Iyer S.','Field mapping and geochronology constrain three deformation phases in the Schirmacher Oasis basement complex.','Gondwana Res. Polar 34, 88-110','PDF','14.6 MB','isea-2023-antarctic-41'),
('Polar night aerosol chemistry at Himadri','publication',2024,'Atmospheric Science','Menon R.','Winter-time ionic composition of Arctic aerosol shows a sustained sulphate-dominated regime punctuated by long-range transport events.','Arctic Atmos. Chem. 12(4), 301-320','PDF','5.5 MB','iare-2024-arctic-winter'),
('All-sky auroral image archive, winter 2024','dataset',2024,'Aurora Studies','Menon R., Kulkarni A.','Calibrated all-sky camera frames at 30 s cadence covering 71 nights of the 2024 polar night.','SIH/DAT/2024/003','HDF5','740 MB','iare-2024-arctic-winter'),
('Antarctic Bottom Water property change along 57E','publication',2023,'Oceanography','Krishnan M., Varma T.','Repeat hydrography reveals continued freshening and warming of bottom water relative to the 2016 occupation.','Deep-Sea Res. Polar 88, 41-59','PDF','8.9 MB','sore-2023-07'),
('SORE-07 Cruise Report','report',2023,'Oceanography','Krishnan M.','Cruise narrative, station log and instrument performance notes for the seventh Southern Ocean leg.','SIH/REP/2023/031','PDF','11.4 MB','sore-2023-07'),
('Hybrid renewable power trial at Maitri: first results','report',2025,'Polar Engineering','Kulkarni A., Rao A.','Performance of the wind-solar-battery module through the first austral summer, with load profiles and fuel displacement estimates.','SIH/REP/2025/029','PDF','7.2 MB','isea-2025-antarctic-43'),
('Microbial communities of subglacial brine, Antarctica','publication',2025,'Microbiology','Iyer S., Rao A.','Amplicon sequencing of subglacial brine reveals a low-diversity, psychrophile-dominated community with novel halotolerant lineages.','Polar Microbiol. 5(1), 1-19','PDF','6.7 MB','isea-2025-antarctic-43'),
('Blue-ice meteorite recovery catalogue 2025','dataset',2025,'Planetary Science','Kulkarni A.','Location, mass and preliminary classification of 19 meteorite fragments recovered from Antarctic blue-ice fields.','SIH/DAT/2025/031','CSV','2 MB','isea-2025-antarctic-43');

INSERT INTO public.media_items (title, kind, caption, credit, theme, captured_on, duration, image_key, expedition_slug) VALUES
('Ice shelf front at midnight sun','photo','The calving front of the Amery ice shelf photographed during continuous daylight in January.','SIH Photo Unit / A. Rao','Cryosphere','2024-01-19',NULL,'ice-shelf','isea-2024-antarctic-42'),
('Drilling the Larsemann core','photo','The drilling team recovers a section of the 210 m ice core at the Larsemann Hills camp.','SIH Photo Unit','Glaciology','2024-02-03',NULL,'blue-ice','isea-2024-antarctic-42'),
('Kongsfjorden sampling morning','photo','Small-boat CTD operations in Kongsfjorden under a low Arctic sun.','SIH Photo Unit / V. Shetty','Oceanography','2025-07-11',NULL,'arctic-fjord','iare-2025-arctic-summer'),
('Inside Himadri Station','photo','The main laboratory corridor at Himadri during the summer occupation.','SIH Photo Unit','Station Life','2025-08-02',NULL,'station-night','iare-2025-arctic-summer'),
('Aurora over the polar night','photo','An auroral arc photographed from the Himadri all-sky platform in February.','SIH Photo Unit / R. Menon','Aurora Studies','2024-02-14',NULL,'aurora','iare-2024-arctic-winter'),
('CTD rosette recovery','photo','The rosette returns to deck after a full-depth cast at the Polar Front.','SIH Photo Unit / M. Krishnan','Oceanography','2024-02-08',NULL,'ship-deck','sore-2024-08'),
('Southern Ocean swell','photo','Heavy swell in the Indian sector of the Southern Ocean during transit south.','SIH Photo Unit','Oceanography','2024-01-24',NULL,'southern-ocean','sore-2024-08'),
('Sutri Dhaka stake survey','photo','Glaciologists reading an ablation stake on Sutri Dhaka glacier.','SIH Photo Unit / K. Nandy','Glaciology','2025-08-19',NULL,'himalaya','himansh-2025'),
('Expedition 42: a season in Antarctica','video','A twelve-minute documentary following the 42nd expedition from Cape Town to the winter-over handover.','SIH Media Cell','Multidisciplinary','2024-05-20','12:24','ice-shelf','isea-2024-antarctic-42'),
('How we drill an ice core','video','Field explainer on ice core drilling, handling and cold-chain transport for school audiences.','SIH Media Cell','Glaciology','2024-06-14','06:48','blue-ice','isea-2024-antarctic-42'),
('Life at Himadri','video','Researchers describe daily routines, science shifts and the polar night at the Arctic station.','SIH Media Cell','Station Life','2025-10-02','08:15','station-night','iare-2025-arctic-summer'),
('Reading the Southern Ocean','video','Onboard explainer on hydrographic sections and why repeat measurements matter.','SIH Media Cell','Oceanography','2024-04-30','09:37','ship-deck','sore-2024-08'),
('Third pole, shrinking ice','video','Chandra basin field footage paired with a decade of mass balance measurements.','SIH Media Cell','Glaciology','2025-11-12','10:02','himalaya','himansh-2025'),
('Meteorite hunt on blue ice','photo','A traverse team surveys a blue-ice field for meteorite fragments.','SIH Photo Unit / A. Kulkarni','Planetary Science','2025-01-27',NULL,'blue-ice','isea-2025-antarctic-43');

INSERT INTO public.activities (title, activity_type, starts_on, ends_on, location, audience, description) VALUES
('National Polar Science Week','Outreach programme','2026-02-16','2026-02-20','Goa and online','School students, teachers','Five days of station live-links, hands-on ice laboratories and film screenings hosted with partner schools across twelve states.'),
('Annual Polar Science Symposium','Conference','2026-03-10','2026-03-12','Goa','Researchers, policy makers','Presentation of results from the 2025 Antarctic, Arctic and Southern Ocean campaigns, with dedicated data-sharing sessions.'),
('Data Stewardship Workshop','Workshop','2026-01-22','2026-01-23','Online','Early career researchers','Practical training on metadata standards, dataset citation and long-term archival for polar observations.'),
('Expedition 44 Recruitment Briefing','Briefing','2026-04-08',NULL,'New Delhi','Prospective expedition members','Selection criteria, medical screening and training timeline for the forthcoming Antarctic season.'),
('Floating Classroom aboard ORV Sagar Nidhi','Outreach programme','2025-12-05','2025-12-07','Chennai Port','School and college students','Guided vessel tours introducing shipboard oceanography, instrument handling and life at sea.'),
('Arctic Council Observer Review Meeting','Institutional','2025-11-18','2025-11-19','Tromsø','Institutional delegates','Review of national Arctic research contributions and cooperation priorities for the coming cycle.'),
('Polar Photography Exhibition','Exhibition','2025-09-01','2025-09-30','Mumbai','General public','A month-long exhibition of expedition photography with curator-led weekend walkthroughs.'),
('Teachers in the Cryosphere','Training','2025-07-14','2025-07-18','Manali','School teachers','Residential field-based training near Himansh Station giving educators direct glaciology experience.');
