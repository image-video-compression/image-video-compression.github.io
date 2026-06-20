/**
 * VENUE_MAP — maps short venue abbreviations (as used in papers.json)
 * to { full, url } where:
 *   full = display name shown in the table
 *   url  = DBLP page (preferred) or canonical journal/conference URL
 */
window.VENUE_MAP = {

  /* ── Top Computer Vision Conferences ── */
  "CVPR":   { full: "Computer Vision and Pattern Recognition (CVPR)",              url: "https://dblp.org/db/conf/cvpr/index" },
  "CVPRW":  { full: "CVPR Workshops (CVPRW)",                                      url: "https://dblp.org/db/conf/cvpr/index" },
  "ICCV":   { full: "International Conference on Computer Vision (ICCV)",          url: "https://dblp.org/db/conf/iccv/index" },
  "ECCV":   { full: "European Conference on Computer Vision (ECCV)",               url: "https://dblp.org/db/conf/eccv/index" },
  "WACV":   { full: "Winter Conference on Applications of Computer Vision (WACV)", url: "https://dblp.org/db/conf/wacv/index" },
  "ACCV":   { full: "Asian Conference on Computer Vision (ACCV)",                  url: "https://dblp.org/db/conf/accv/index" },
  "BMVC":   { full: "British Machine Vision Conference (BMVC)",                    url: "https://dblp.org/db/conf/bmvc/index" },

  /* ── Machine Learning Conferences ── */
  "NeurIPS":  { full: "Advances in Neural Information Processing Systems (NeurIPS)", url: "https://dblp.org/db/conf/nips/index" },
  "NeurIPS W":{ full: "NeurIPS Workshop (NeurIPS W)",                               url: "https://dblp.org/db/conf/nips/index" },
  "ICLR":     { full: "International Conference on Learning Representations (ICLR)", url: "https://dblp.org/db/conf/iclr/index" },
  "ICML":     { full: "International Conference on Machine Learning (ICML)",         url: "https://dblp.org/db/conf/icml/index" },

  /* ── AI Conferences ── */
  "AAAI":   { full: "AAAI Conference on Artificial Intelligence (AAAI)",           url: "https://dblp.org/db/conf/aaai/index" },
  "IJCAI":  { full: "International Joint Conference on Artificial Intelligence (IJCAI)", url: "https://dblp.org/db/conf/ijcai/index" },

  /* ── Signal & Image Processing Conferences ── */
  "ICASSP": { full: "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)", url: "https://dblp.org/db/conf/icassp/index" },
  "ICIP":   { full: "IEEE International Conference on Image Processing (ICIP)",    url: "https://dblp.org/db/conf/icip/index" },
  "DCC":    { full: "Data Compression Conference (DCC)",                           url: "https://dblp.org/db/conf/dcc/index" },
  "PCS":    { full: "Picture Coding Symposium (PCS)",                             url: "https://dblp.org/db/conf/pcs/index" },
  "ACMMM":  { full: "ACM International Conference on Multimedia (ACM MM)",        url: "https://dblp.org/db/conf/mm/index" },
  "IJCNN":  { full: "International Joint Conference on Neural Networks (IJCNN)",   url: "https://dblp.org/db/conf/ijcnn/index" },
  "Asilomar":{ full: "Asilomar Conference on Signals, Systems and Computers",      url: "https://dblp.org/db/conf/acssc/index" },
  "HICSS":  { full: "Hawaii International Conference on System Sciences (HICSS)",  url: "https://dblp.org/db/conf/hicss/index" },
  "SSST":   { full: "Workshop on Syntax, Semantics and Structure in Statistical Translation (SSST)", url: "https://dblp.org/db/conf/ssst/index" },
  "RecPad": { full: "Portuguese Conference on Pattern Recognition (RecPad)",       url: "https://dblp.org/db/conf/recpad/index" },
  "Southwest Symposium on Image Analysis and Interpretation": { full: "Southwest Symposium on Image Analysis and Interpretation (SSIAI)", url: "https://dblp.org/db/conf/ssiai/index" },
  "International Conference on Wireless Communications and Signal Processing": { full: "International Conference on Wireless Communications and Signal Processing (WCSP)", url: "https://dblp.org/db/conf/wcsp/index" },
  "IEEE Visual Communications and Image Processing Conference": { full: "IEEE Visual Communications and Image Processing Conference (VCIP)", url: "https://dblp.org/db/conf/vcip/index" },

  /* ── IEEE Transactions ── */
  "TCSVT":  { full: "IEEE Transactions on Circuits and Systems for Video Technology (TCSVT)", url: "https://dblp.org/db/journals/tcsvt/index" },
  "TIP":    { full: "IEEE Transactions on Image Processing (TIP)",                url: "https://dblp.org/db/journals/tip/index" },
  "TPAMI":  { full: "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)", url: "https://dblp.org/db/journals/pami/index" },
  "TMM":    { full: "IEEE Transactions on Multimedia (TMM)",                      url: "https://dblp.org/db/journals/tmm/index" },
  "TIT":    { full: "IEEE Transactions on Information Theory (TIT)",              url: "https://dblp.org/db/journals/tit/index" },
  "TCOM":   { full: "IEEE Transactions on Communications (TCOM)",                 url: "https://dblp.org/db/journals/tcom/index" },
  "TBC":    { full: "IEEE Transactions on Broadcasting (TBC)",                    url: "https://dblp.org/db/journals/tbc/index" },
  "TC":     { full: "IEEE Transactions on Computers (TC)",                        url: "https://dblp.org/db/journals/tc/index" },
  "SPL":    { full: "IEEE Signal Processing Letters (SPL)",                       url: "https://dblp.org/db/journals/spl/index" },
  "Proc. IEEE": { full: "Proceedings of the IEEE",                                url: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=5" },
  "IEEE Transactions on Geoscience and Remote Sensing": { full: "IEEE Transactions on Geoscience and Remote Sensing (TGRS)", url: "https://dblp.org/db/journals/tgrs/index" },
  "IEEE Transactions on Neural Networks and Learning Systems": { full: "IEEE Transactions on Neural Networks and Learning Systems (TNNLS)", url: "https://dblp.org/db/journals/tnn/index" },
  "IEEE Journal on Emerging and Selected Topics in Circuits and Systems": { full: "IEEE Journal on Emerging and Selected Topics in Circuits and Systems (JETCAS)", url: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=5503869" },
  "IEICE Transactions on Information and Systems": { full: "IEICE Transactions on Information and Systems", url: "https://dblp.org/db/journals/ieicet/index" },

  /* ── Other Journals ── */
  "ACM Computing Surveys": { full: "ACM Computing Surveys (CSUR)",                url: "https://dblp.org/db/journals/csur/index" },
  "JVCIR":  { full: "Journal of Visual Communication and Image Representation (JVCIR)", url: "https://dblp.org/db/journals/jvcir/index" },
  "SPIC":   { full: "Signal Processing: Image Communication (SPIC)",              url: "https://dblp.org/db/journals/spic/index" },
  "SIVP":   { full: "Signal, Image and Video Processing (SIVP)",                  url: "https://dblp.org/db/journals/sivp/index" },
  "Neural Networks": { full: "Neural Networks",                                   url: "https://dblp.org/db/journals/nn/index" },
  "Neural Comput.":  { full: "Neural Computation",                                url: "https://dblp.org/db/journals/neco/index" },
  "Neurocomputing":  { full: "Neurocomputing",                                    url: "https://dblp.org/db/journals/ijon/index" },
  "Inf. Fusion":     { full: "Information Fusion",                                url: "https://dblp.org/db/journals/inffus/index" },
  "Information Sciences": { full: "Information Sciences",                         url: "https://dblp.org/db/journals/isci/index" },
  "ESWA":    { full: "Expert Systems with Applications (ESWA)",                   url: "https://dblp.org/db/journals/eswa/index" },
  "CACM":    { full: "Communications of the ACM (CACM)",                          url: "https://dblp.org/db/journals/cacm/index" },
  "CPAM":    { full: "Communications on Pure and Applied Mathematics (CPAM)",     url: "https://onlinelibrary.wiley.com/journal/10970312" },
  "FnT ML":  { full: "Foundations and Trends in Machine Learning (FnTML)",        url: "https://www.nowpublishers.com/mal" },
  "BSTJ":    { full: "Bell System Technical Journal (BSTJ)",                      url: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=6773516" },
  "IRE":     { full: "Proceedings of the IRE",                                    url: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=6773516" },
  "IRE Nat. Conv. Rec.": { full: "IRE National Convention Record",                url: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=6773516" },
  "Proc. IRE": { full: "Proceedings of the IRE",                                  url: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=6773516" },
  "Appl. Sci.": { full: "Applied Sciences (MDPI)",                                url: "https://www.mdpi.com/journal/applsci" },
  "Electronics": { full: "Electronics (MDPI)",                                    url: "https://www.mdpi.com/journal/electronics" },
  "Color Res. Appl.": { full: "Color Research & Application",                     url: "https://onlinelibrary.wiley.com/journal/15206378" },
  "JKSAU-CIS": { full: "Journal of King Saud University – Computer and Information Sciences", url: "https://www.sciencedirect.com/journal/journal-of-king-saud-university-computer-and-information-sciences" },
  "IJCSI":  { full: "International Journal of Computer Science Issues (IJCSI)",   url: "https://ijcsi.org" },
  "International Journal of Machine Learning and Cybernetics": { full: "International Journal of Machine Learning and Cybernetics", url: "https://link.springer.com/journal/13042" },
  "ISRN":   { full: "International Scholarly Research Notices (ISRN)",            url: "https://www.hindawi.com/journals/isrn/" },
  "Resonance": { full: "Resonance – Journal of Science Education",                url: "https://www.ias.ac.in/resonance/" },
  "WPC":    { full: "Wireless Personal Communications (Springer)",                url: "https://link.springer.com/journal/11277" },
  "SPIE":   { full: "Proceedings of SPIE",                                        url: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie" },

  /* ── Additional journals ── */
  "PR":      { full: "Pattern Recognition",                                        url: "https://dblp.org/db/journals/pr/index" },
  "CVIU":    { full: "Computer Vision and Image Understanding (CVIU)",             url: "https://dblp.org/db/journals/cviu/index" },
  "IVC":     { full: "Image and Vision Computing (IVC)",                           url: "https://dblp.org/db/journals/ivc/index" },
  "JMLR":    { full: "Journal of Machine Learning Research (JMLR)",                url: "https://dblp.org/db/journals/jmlr/index" },
  "TSP":     { full: "IEEE Transactions on Signal Processing (TSP)",               url: "https://dblp.org/db/journals/tsp/index" },
  "JSTSP":   { full: "IEEE Journal of Selected Topics in Signal Processing (JSTSP)", url: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4200690" },
  "OJSP":    { full: "IEEE Open Journal of Signal Processing (OJSP)",              url: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=8782711" },
  "TGRS":    { full: "IEEE Transactions on Geoscience and Remote Sensing (TGRS)",  url: "https://dblp.org/db/journals/tgrs/index" },
  "TNNLS":   { full: "IEEE Transactions on Neural Networks and Learning Systems (TNNLS)", url: "https://dblp.org/db/journals/tnn/index" },
  "JETCAS":  { full: "IEEE Journal on Emerging and Selected Topics in Circuits and Systems (JETCAS)", url: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=5503869" },
  "IEICE":   { full: "IEICE Transactions on Information and Systems",              url: "https://dblp.org/db/journals/ieicet/index" },
  "IJMLC":   { full: "International Journal of Machine Learning and Cybernetics (IJMLC)", url: "https://link.springer.com/journal/13042" },
  "MICCAI":  { full: "Medical Image Computing and Computer Assisted Intervention (MICCAI)", url: "https://dblp.org/db/conf/miccai/index" },
  "INTERSPEECH": { full: "INTERSPEECH",                                            url: "https://dblp.org/db/conf/interspeech/index" },
  "VCIP":    { full: "IEEE Visual Communications and Image Processing Conference (VCIP)", url: "https://dblp.org/db/conf/vcip/index" },
  "WCSP":    { full: "International Conference on Wireless Communications and Signal Processing (WCSP)", url: "https://dblp.org/db/conf/wcsp/index" },
  "SSIAI":   { full: "Southwest Symposium on Image Analysis and Interpretation (SSIAI)", url: "https://dblp.org/db/conf/ssiai/index" },

  /* ── Preprints / Standards / Tech reports ── */
  "arXiv":      { full: "arXiv Preprint",                                         url: "https://arxiv.org" },
  "ISO/IEC":    { full: "ISO/IEC Standard",                                       url: "https://www.iso.org" },
  "ITU-T VCEG": { full: "ITU-T Video Coding Experts Group (VCEG)",                url: "https://www.itu.int/en/ITU-T/studygroups/2017-2020/16/Pages/default.aspx" },
  "Netflix Tech Blog": { full: "Netflix Tech Blog",                               url: "https://netflixtechblog.com" },
  "JPL":        { full: "Jet Propulsion Laboratory Technical Report (JPL)",       url: "https://www.jpl.nasa.gov" },
  "NTC":        { full: "National Telecommunications Conference (NTC)",           url: "https://dblp.org" },
  "DL-VSP":     { full: "Deep Learning for Visual Signal Processing (Springer)",  url: "https://link.springer.com" },

  /* ── Publishers (book chapters / textbooks) ── */
  "Springer":        { full: "Springer",         url: "https://link.springer.com" },
  "Wiley":           { full: "John Wiley & Sons", url: "https://www.wiley.com" },
  "Morgan Kaufmann": { full: "Morgan Kaufmann",  url: "https://www.elsevier.com/books-and-journals/morgan-kaufmann" },
  "Academic Press":  { full: "Academic Press",   url: "https://www.elsevier.com/books-and-journals/academic-press" },
  "Prentice-Hall":   { full: "Prentice-Hall",    url: "https://www.pearson.com" },
};
