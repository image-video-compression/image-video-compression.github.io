/**
 * SURVEY_VENUES — clean, deduplicated venue list for the submit form.
 * Format: { abbrev, full }
 *   abbrev = value stored in paper.venue (matches papers.json keys)
 *   full   = human-readable name shown in dropdown
 *
 * Dropdown renders as: "Full Name (ABBREV)"
 */
window.SURVEY_VENUES = [

  /* ── Top Computer Vision Conferences ── */
  { abbrev: "CVPR",    full: "Computer Vision and Pattern Recognition" },
  { abbrev: "CVPRW",   full: "CVPR Workshops" },
  { abbrev: "ICCV",    full: "International Conference on Computer Vision" },
  { abbrev: "ECCV",    full: "European Conference on Computer Vision" },
  { abbrev: "WACV",    full: "Winter Conference on Applications of Computer Vision" },
  { abbrev: "ACCV",    full: "Asian Conference on Computer Vision" },
  { abbrev: "BMVC",    full: "British Machine Vision Conference" },

  /* ── Machine Learning Conferences ── */
  { abbrev: "NeurIPS",   full: "Advances in Neural Information Processing Systems" },
  { abbrev: "NeurIPS W", full: "NeurIPS Workshop" },
  { abbrev: "ICLR",      full: "International Conference on Learning Representations" },
  { abbrev: "ICML",      full: "International Conference on Machine Learning" },

  /* ── AI Conferences ── */
  { abbrev: "AAAI",    full: "AAAI Conference on Artificial Intelligence" },
  { abbrev: "IJCAI",   full: "International Joint Conference on Artificial Intelligence" },

  /* ── Signal, Image & Video Processing Conferences ── */
  { abbrev: "ICASSP",  full: "IEEE International Conference on Acoustics, Speech and Signal Processing" },
  { abbrev: "ICIP",    full: "IEEE International Conference on Image Processing" },
  { abbrev: "DCC",     full: "Data Compression Conference" },
  { abbrev: "PCS",     full: "Picture Coding Symposium" },
  { abbrev: "ACMMM",   full: "ACM International Conference on Multimedia" },
  { abbrev: "IJCNN",   full: "International Joint Conference on Neural Networks" },
  { abbrev: "Asilomar",full: "Asilomar Conference on Signals, Systems and Computers" },
  { abbrev: "HICSS",   full: "Hawaii International Conference on System Sciences" },
  { abbrev: "SSST",    full: "Workshop on Syntax, Semantics and Structure in Statistical Translation" },
  { abbrev: "RecPad",  full: "Portuguese Conference on Pattern Recognition" },
  { abbrev: "VCIP",    full: "IEEE Visual Communications and Image Processing Conference" },
  { abbrev: "WCSP",    full: "International Conference on Wireless Communications and Signal Processing" },
  { abbrev: "SSIAI",   full: "Southwest Symposium on Image Analysis and Interpretation" },
  { abbrev: "MICCAI",  full: "Medical Image Computing and Computer Assisted Intervention" },
  { abbrev: "INTERSPEECH", full: "Annual Conference of the International Speech Communication Association" },

  /* ── IEEE Transactions ── */
  { abbrev: "TCSVT",   full: "IEEE Transactions on Circuits and Systems for Video Technology" },
  { abbrev: "TIP",     full: "IEEE Transactions on Image Processing" },
  { abbrev: "TPAMI",   full: "IEEE Transactions on Pattern Analysis and Machine Intelligence" },
  { abbrev: "TMM",     full: "IEEE Transactions on Multimedia" },
  { abbrev: "TIT",     full: "IEEE Transactions on Information Theory" },
  { abbrev: "TCOM",    full: "IEEE Transactions on Communications" },
  { abbrev: "TBC",     full: "IEEE Transactions on Broadcasting" },
  { abbrev: "TC",      full: "IEEE Transactions on Computers" },
  { abbrev: "SPL",     full: "IEEE Signal Processing Letters" },
  { abbrev: "TGRS",    full: "IEEE Transactions on Geoscience and Remote Sensing" },
  { abbrev: "TNNLS",   full: "IEEE Transactions on Neural Networks and Learning Systems" },
  { abbrev: "JETCAS",  full: "IEEE Journal on Emerging and Selected Topics in Circuits and Systems" },
  { abbrev: "JSTSP",   full: "IEEE Journal of Selected Topics in Signal Processing" },
  { abbrev: "TSP",     full: "IEEE Transactions on Signal Processing" },
  { abbrev: "OJSP",    full: "IEEE Open Journal of Signal Processing" },

  /* ── Other Journals ── */
  { abbrev: "ACM Computing Surveys", full: "ACM Computing Surveys" },
  { abbrev: "JVCIR",   full: "Journal of Visual Communication and Image Representation" },
  { abbrev: "SPIC",    full: "Signal Processing: Image Communication" },
  { abbrev: "SIVP",    full: "Signal, Image and Video Processing" },
  { abbrev: "Neural Networks",  full: "Neural Networks" },
  { abbrev: "Neural Comput.",   full: "Neural Computation" },
  { abbrev: "Neurocomputing",   full: "Neurocomputing" },
  { abbrev: "Inf. Fusion",      full: "Information Fusion" },
  { abbrev: "Information Sciences", full: "Information Sciences" },
  { abbrev: "ESWA",    full: "Expert Systems with Applications" },
  { abbrev: "CACM",    full: "Communications of the ACM" },
  { abbrev: "CPAM",    full: "Communications on Pure and Applied Mathematics" },
  { abbrev: "FnT ML",  full: "Foundations and Trends in Machine Learning" },
  { abbrev: "BSTJ",    full: "Bell System Technical Journal" },
  { abbrev: "Appl. Sci.", full: "Applied Sciences (MDPI)" },
  { abbrev: "Electronics",   full: "Electronics (MDPI)" },
  { abbrev: "Color Res. Appl.", full: "Color Research and Application" },
  { abbrev: "JKSAU-CIS", full: "Journal of King Saud University – Computer and Information Sciences" },
  { abbrev: "IJCSI",   full: "International Journal of Computer Science Issues" },
  { abbrev: "IJMLC",   full: "International Journal of Machine Learning and Cybernetics" },
  { abbrev: "ISRN",    full: "International Scholarly Research Notices" },
  { abbrev: "Resonance", full: "Resonance – Journal of Science Education" },
  { abbrev: "WPC",     full: "Wireless Personal Communications" },
  { abbrev: "IEICE",   full: "IEICE Transactions on Information and Systems" },
  { abbrev: "PR",      full: "Pattern Recognition" },
  { abbrev: "CVIU",    full: "Computer Vision and Image Understanding" },
  { abbrev: "IVC",     full: "Image and Vision Computing" },
  { abbrev: "JMLR",    full: "Journal of Machine Learning Research" },

  /* ── Standards / Technical Reports ── */
  { abbrev: "arXiv",       full: "arXiv Preprint" },
  { abbrev: "ISO/IEC",     full: "ISO/IEC Standard" },
  { abbrev: "ITU-T VCEG",  full: "ITU-T Video Coding Experts Group" },
  { abbrev: "Netflix Tech Blog", full: "Netflix Tech Blog" },
  { abbrev: "JPL",         full: "Jet Propulsion Laboratory Technical Report" },
  { abbrev: "NTC",         full: "National Telecommunications Conference" },
  { abbrev: "SPIE",        full: "Proceedings of SPIE" },
  { abbrev: "IRE",         full: "Proceedings of the IRE" },
  { abbrev: "Proc. IEEE",  full: "Proceedings of the IEEE" },

  /* ── Publishers ── */
  { abbrev: "Springer",        full: "Springer" },
  { abbrev: "Wiley",           full: "John Wiley and Sons" },
  { abbrev: "Morgan Kaufmann", full: "Morgan Kaufmann" },
  { abbrev: "Academic Press",  full: "Academic Press" },
  { abbrev: "Prentice-Hall",   full: "Prentice-Hall" },
  { abbrev: "DL-VSP",          full: "Deep Learning for Visual Signal Processing (Springer)" },
];
