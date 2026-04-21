const normalizeTitle = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const resolveVariant = (service = {}) => {
  if (service.id) return service.id;

  const title = normalizeTitle(service.title);

  if (title.includes("electric")) return "electrical";
  if (title.includes("telecom") || title.includes(" ti ") || title.startsWith("ti ")) return "telecom";
  if (title.includes("edge") || title.includes("leed") || title.includes("certif")) return "edge";
  if (title.includes("incend") || title.includes("sprinkler") || title.includes("alarm")) return "fire-protection";
  if (title.includes("gas") || title.includes("plomer") || title.includes("sanitar")) return "plumbing-gas";
  if (title.includes("mechan") || title.includes("mecan") || title.includes("hvac")) return "mechanical";
  if (title.includes("arquitect") || title.includes("archit") || title.includes("interior")) return "arch-design";

  return "general";
};

const BlueprintBase = ({ children }) => (
  <svg className="service-illustration" viewBox="0 0 320 220" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="318" height="218" rx="26" className="service-illustration__paper" />
    <path d="M34 48H286" className="service-illustration__grid" />
    <path d="M24 88H296" className="service-illustration__grid" />
    <path d="M30 128H290" className="service-illustration__grid" />
    <path d="M42 168H278" className="service-illustration__grid" />
    <path d="M78 26V194" className="service-illustration__grid" />
    <path d="M160 18V198" className="service-illustration__grid" />
    <path d="M242 26V194" className="service-illustration__grid" />
    <path d="M0 188H320" className="service-illustration__ground" />

    <g className="service-illustration__outline">
      <path d="M0 188H36V146L84 139V188" />
      <path d="M104 188V146H142V46L178 18V188" />
      <path d="M178 146H216V188" />
      <path d="M216 188V142L266 150V188" />
      <path d="M142 112H184V146H142Z" />
      <path d="M186 36C190 50 196 58 202 61V146" />
      <path d="M165 62V146" />
    </g>

    {children}
  </svg>
);

const ArchitectureIcon = () => (
  <svg className="service-illustration" viewBox="0 0 320 220" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="318" height="218" rx="26" className="service-illustration__paper" />
    <path d="M34 48H286" className="service-illustration__grid" />
    <path d="M24 88H296" className="service-illustration__grid" />
    <path d="M30 128H290" className="service-illustration__grid" />
    <path d="M42 168H278" className="service-illustration__grid" />
    <path d="M78 26V194" className="service-illustration__grid" />
    <path d="M160 18V198" className="service-illustration__grid" />
    <path d="M242 26V194" className="service-illustration__grid" />
    <path d="M0 194H320" className="service-illustration__ground" />

    <g className="service-illustration__detail">
      <path d="M42 176L112 114L284 127L214 190Z" />
      <path d="M58 180L127 118" />
      <path d="M88 183L157 121" />
      <path d="M118 186L187 124" />
      <path d="M148 188L217 126" />
      <path d="M178 190L247 129" />
      <path d="M77 145L249 159" />
      <path d="M61 160L233 174" />
      <path d="M92 132L265 146" />
      <path d="M49 176L79 149L111 151L81 178Z" />
      <path d="M60 172L89 147" />
      <path d="M72 161L101 163" />
      <path d="M67 167L96 170" />
      <path d="M83 174L109 176" />
    </g>

    <g className="service-illustration__outline">
      <path d="M118 154L176 160L228 127L170 121Z" />
      <path d="M118 154V120" />
      <path d="M176 160V126" />
      <path d="M228 127V93" />
      <path d="M170 121V87" />
      <path d="M118 120L176 126L228 93L170 87Z" />
      <path d="M136 156V122" />
      <path d="M154 158V124" />
      <path d="M194 149V115" />
      <path d="M212 138V104" />
      <path d="M118 137L176 143L228 110" />
      <path d="M146 104L165 89" />
      <path d="M165 89L186 91" />
      <path d="M186 91L167 106" />
      <path d="M167 106L146 104" />
    </g>

    <g className="service-illustration__accent">
      <path d="M242 42H278V86H242Z" />
      <path d="M266 42V55H278" />
      <path d="M266 42L278 55" />
      <path d="M250 58H268" />
      <path d="M250 65H270" />
      <path d="M250 72H263" />
      <path d="M107 104L234 115" />
      <path d="M107 100V108" />
      <path d="M234 111V119" />
      <path d="M221 121L244 106" />
      <path d="M214 191L282 131" />
      <path d="M210 187L218 194" />
      <path d="M278 127L286 134" />
      <path d="M42 193L214 206" />
      <path d="M42 189V197" />
      <path d="M214 202V210" />
    </g>
  </svg>
);

const MechanicalIcon = () => (
  <BlueprintBase>
    <g className="service-illustration__detail">
      <path d="M171 68H224V54H258" />
      <path d="M224 54V92H258" />
      <path d="M224 92H242V118" />
      <path d="M196 122H250V178H196Z" />
      <circle cx="223" cy="150" r="18" />
      <path d="M223 132V168" />
      <path d="M205 150H241" />
      <path d="M210 137L236 163" />
      <path d="M236 137L210 163" />
      <path d="M39 124H97V164H39Z" />
      <path d="M48 150L58 142L69 146L83 132" />
      <path d="M48 156H89" />
      <path d="M58 164V172H78" />
    </g>
    <g className="service-illustration__accent">
      <path d="M116 116V176" />
      <path d="M124 122V170" />
      <path d="M132 129V164" />
      <path d="M245 88V115" />
    </g>
  </BlueprintBase>
);

const PlumbingGasIcon = () => (
  <BlueprintBase>
    <g className="service-illustration__detail">
      <path d="M34 154H120V129H164V154H238" />
      <path d="M84 154V188" />
      <path d="M142 129V188" />
      <path d="M218 154V188" />
      <circle cx="120" cy="154" r="8" />
      <path d="M120 146V162" />
      <path d="M112 154H128" />
      <circle cx="213" cy="156" r="16" />
      <path d="M213 156L221 149" />
      <path d="M58 171H92" />
      <path d="M66 171V188" />
    </g>
    <g className="service-illustration__accent">
      <path d="M190 68C190 55 203 48 204 36C205 48 218 55 218 68C218 78 212 86 204 86C196 86 190 78 190 68Z" />
      <path d="M243 91C236 83 237 70 249 58C260 70 262 82 256 90C262 95 262 105 254 111C247 116 237 112 233 104C230 97 234 90 243 91Z" />
      <path d="M246 75C248 83 246 89 241 94" />
      <path d="M203 87V101" />
    </g>
  </BlueprintBase>
);

const ElectricalIcon = () => (
  <BlueprintBase>
    <g className="service-illustration__detail">
      <path d="M38 118H96V170H38Z" />
      <path d="M50 132H84" />
      <path d="M50 144H84" />
      <path d="M50 156H72" />
      <path d="M96 145H130V118H165" />
      <circle cx="130" cy="145" r="4" />
      <circle cx="165" cy="118" r="4" />
      <path d="M216 122H258V150H240V188" />
      <circle cx="240" cy="150" r="4" />
      <path d="M178 78L158 110H174L163 146L190 104H174L186 78" />
    </g>
    <g className="service-illustration__accent">
      <path d="M222 122V100H246" />
      <path d="M56 170V188" />
      <path d="M72 170V182" />
    </g>
  </BlueprintBase>
);

const FireProtectionIcon = () => (
  <BlueprintBase>
    <g className="service-illustration__detail">
      <path d="M176 28V78" />
      <path d="M158 78H194" />
      <path d="M165 78L158 92" />
      <path d="M176 78V98" />
      <path d="M187 78L194 92" />
      <path d="M176 68H242V98" />
      <path d="M210 124H254V178H210Z" />
      <circle cx="232" cy="151" r="11" />
      <path d="M232 140V162" />
      <path d="M221 151H243" />
      <path d="M42 118H84V160H42Z" />
      <path d="M52 140H74" />
      <path d="M63 129V151" />
    </g>
    <g className="service-illustration__accent">
      <path d="M63 160V188" />
      <path d="M221 112H243" />
      <path d="M232 98V124" />
    </g>
  </BlueprintBase>
);

const TelecomIcon = () => (
  <BlueprintBase>
    <g className="service-illustration__detail">
      <path d="M176 34V76" />
      <path d="M165 46C171 39 181 39 187 46" />
      <path d="M156 36C167 24 185 24 196 36" />
      <path d="M41 118H86V178H41Z" />
      <path d="M50 132H77" />
      <path d="M50 145H77" />
      <path d="M50 158H77" />
      <path d="M86 148H132V124H169" />
      <circle cx="132" cy="148" r="4" />
      <path d="M219 114H246L260 127H234Z" />
      <path d="M232 127V142" />
      <path d="M223 142H254" />
      <path d="M244 127L255 118" />
    </g>
    <g className="service-illustration__accent">
      <path d="M58 178V188" />
      <path d="M246 142V188" />
    </g>
  </BlueprintBase>
);

const EdgeIcon = () => (
  <BlueprintBase>
    <g className="service-illustration__detail">
      <path d="M40 160H96" />
      <path d="M54 160V144" />
      <path d="M68 160V132" />
      <path d="M82 160V118" />
      <path d="M172 72C155 88 155 121 174 138C193 120 194 86 182 68C173 75 169 93 174 112" />
      <circle cx="246" cy="66" r="15" />
      <path d="M246 42V34" />
      <path d="M246 98V90" />
      <path d="M270 66H278" />
      <path d="M214 66H222" />
      <path d="M263 49L269 43" />
      <path d="M229 83L223 89" />
    </g>
    <g className="service-illustration__accent">
      <path d="M222 154H252" />
      <path d="M230 154V188" />
      <path d="M244 154V176" />
      <path d="M258 154V168" />
    </g>
  </BlueprintBase>
);

const GeneralIcon = () => (
  <BlueprintBase>
    <g className="service-illustration__detail">
      <path d="M38 152H86" />
      <path d="M59 152V188" />
      <path d="M150 82H178" />
      <path d="M150 104H178" />
      <path d="M150 126H178" />
      <path d="M216 126H250V154H216Z" />
      <circle cx="234" cy="171" r="13" />
    </g>
    <g className="service-illustration__accent">
      <path d="M234 158V184" />
      <path d="M221 171H247" />
    </g>
  </BlueprintBase>
);

const variants = {
  "arch-design": ArchitectureIcon,
  mechanical: MechanicalIcon,
  "plumbing-gas": PlumbingGasIcon,
  electrical: ElectricalIcon,
  "fire-protection": FireProtectionIcon,
  telecom: TelecomIcon,
  edge: EdgeIcon,
  general: GeneralIcon,
};

const ProfessionalServiceIllustration = ({ service }) => {
  const variant = resolveVariant(service);
  const VariantComponent = variants[variant] || GeneralIcon;

  return <VariantComponent />;
};

export default ProfessionalServiceIllustration;
