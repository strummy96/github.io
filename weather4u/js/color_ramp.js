// Color ramp functions generated by RampGenerator.com

// This function allows you to enter a value and have the color returned,
// useful when coloring geojson maps or anything else you can think of.

// sample usage:
// console.log(getColor(-18));
// result: #7E13ED

function getColor(v) {
    return v >= 130 ? '#F7EAE7' :
      v >= 148 ? '#F6E3E0' :
      v >= 147 ? '#F5DCDA' :
      v >= 146 ? '#F4D6D3' :
      v >= 145 ? '#F3CFCD' :
      v >= 144 ? '#F3C9C6' :
      v >= 143 ? '#F2C2C0' :
      v >= 142 ? '#F1BBB9' :
      v >= 141 ? '#F0B5B3' :
      v >= 140 ? '#F0AEAC' :
      v >= 139 ? '#EFA8A6' :
      v >= 138 ? '#EEA19F' :
      v >= 137 ? '#ED9A99' :
      v >= 136 ? '#ED9492' :
      v >= 135 ? '#EC8D8C' :
      v >= 134 ? '#EB8785' :
      v >= 133 ? '#EA807F' :
      v >= 132 ? '#E97978' :
      v >= 131 ? '#E97372' :
      v >= 130 ? '#E86C6B' :
      v >= 129 ? '#E76665' :
      v >= 128 ? '#E65F5E' :
      v >= 127 ? '#E65858' :
      v >= 126 ? '#E55251' :
      v >= 125 ? '#E44B4B' :
      v >= 124 ? '#E34544' :
      v >= 123 ? '#E33E3E' :
      v >= 122 ? '#E23737' :
      v >= 121 ? '#E13131' :
      v >= 120 ? '#E02A2A' :
      v >= 119 ? '#E02424' :
      v >= 118 ? '#E02D23' :
      v >= 117 ? '#E13722' :
      v >= 116 ? '#E14121' :
      v >= 115 ? '#E24B20' :
      v >= 114 ? '#E3551F' :
      v >= 113 ? '#E35F1E' :
      v >= 112 ? '#E4691E' :
      v >= 111 ? '#E5731D' :
      v >= 110 ? '#E57D1C' :
      v >= 109 ? '#E6871B' :
      v >= 108 ? '#E7901A' :
      v >= 107 ? '#E79A19' :
      v >= 106 ? '#E8A418' :
      v >= 105 ? '#E9AE18' :
      v >= 104 ? '#E9B817' :
      v >= 103 ? '#EAC216' :
      v >= 102 ? '#EBCC15' :
      v >= 101 ? '#EBD614' :
      v >= 100 ? '#ECE013' :
      v >= 99 ? '#EDEA13' :
      v >= 98 ? '#E2EA14' :
      v >= 97 ? '#D7EA15' :
      v >= 96 ? '#CCEA16' :
      v >= 95 ? '#C1EA17' :
      v >= 94 ? '#B6EA18' :
      v >= 93 ? '#ABEA19' :
      v >= 92 ? '#A0EB1A' :
      v >= 91 ? '#95EB1B' :
      v >= 90 ? '#8AEB1C' :
      v >= 89 ? '#80EB1E' :
      v >= 88 ? '#75EB1F' :
      v >= 87 ? '#6AEB20' :
      v >= 86 ? '#5FEB21' :
      v >= 85 ? '#54EC22' :
      v >= 84 ? '#49EC23' :
      v >= 83 ? '#3EEC24' :
      v >= 82 ? '#33EC25' :
      v >= 81 ? '#28EC26' :
      v >= 80 ? '#1DEC27' :
      v >= 79 ? '#13ED29' :
      v >= 78 ? '#13EB31' :
      v >= 77 ? '#14E93A' :
      v >= 76 ? '#15E743' :
      v >= 75 ? '#16E54C' :
      v >= 74 ? '#16E355' :
      v >= 73 ? '#17E15E' :
      v >= 72 ? '#18E066' :
      v >= 71 ? '#19DE6F' :
      v >= 70 ? '#19DC78' :
      v >= 69 ? '#1ADA81' :
      v >= 68 ? '#1BD88A' :
      v >= 67 ? '#1CD693' :
      v >= 66 ? '#1CD49C' :
      v >= 65 ? '#1DD3A4' :
      v >= 64 ? '#1ED1AD' :
      v >= 63 ? '#1FCFB6' :
      v >= 62 ? '#1FCDBF' :
      v >= 61 ? '#20CBC8' :
      v >= 60 ? '#21C9D1' :
      v >= 59 ? '#22C8DA' :
      v >= 58 ? '#21BFDA' :
      v >= 57 ? '#20B7DB' :
      v >= 56 ? '#1FAFDC' :
      v >= 55 ? '#1FA6DD' :
      v >= 54 ? '#1E9EDE' :
      v >= 53 ? '#1D96DF' :
      v >= 52 ? '#1C8DE0' :
      v >= 51 ? '#1C85E1' :
      v >= 50 ? '#1B7DE2' :
      v >= 49 ? '#1A75E3' :
      v >= 48 ? '#196CE4' :
      v >= 47 ? '#1964E5' :
      v >= 46 ? '#185CE6' :
      v >= 45 ? '#1753E7' :
      v >= 44 ? '#164BE8' :
      v >= 43 ? '#1643E9' :
      v >= 42 ? '#153AEA' :
      v >= 41 ? '#1432EB' :
      v >= 40 ? '#132AEC' :
      v >= 39 ? '#1322ED' :
      v >= 38 ? '#1521ED' :
      v >= 37 ? '#1821ED' :
      v >= 36 ? '#1B20ED' :
      v >= 35 ? '#1E20ED' :
      v >= 34 ? '#2120ED' :
      v >= 33 ? '#241FED' :
      v >= 32 ? '#271FED' :
      v >= 31 ? '#2A1EED' :
      v >= 30 ? '#2D1EED' :
      v >= 29 ? '#2F1EED' :
      v >= 28 ? '#321DED' :
      v >= 27 ? '#351DED' :
      v >= 26 ? '#381DED' :
      v >= 25 ? '#3B1CED' :
      v >= 24 ? '#3E1CED' :
      v >= 23 ? '#411BED' :
      v >= 22 ? '#441BED' :
      v >= 21 ? '#471BED' :
      v >= 20 ? '#4A1AED' :
      v >= 19 ? '#4C1AED' :
      v >= 18 ? '#4F19ED' :
      v >= 17 ? '#5219ED' :
      v >= 16 ? '#5519ED' :
      v >= 15 ? '#5818ED' :
      v >= 14 ? '#5B18ED' :
      v >= 13 ? '#5E18ED' :
      v >= 12 ? '#6117ED' :
      v >= 11 ? '#6417ED' :
      v >= 10 ? '#6716ED' :
      v >= 9 ? '#6916ED' :
      v >= 8 ? '#6C16ED' :
      v >= 7 ? '#6F15ED' :
      v >= 6 ? '#7215ED' :
      v >= 5 ? '#7514ED' :
      v >= 4 ? '#7814ED' :
      v >= 3 ? '#7B14ED' :
      v >= 2 ? '#7E13ED' :
      v >= 1 ? '#8113ED' :
      v >= -20 ? '#8413ED' :
              '#8413ED'; 
  }

  function getInput() {
    console.log("getInput")
    let in_text = document.querySelector("#color-input").value;
    let color_div = document.querySelector("#color");
    color_div.style.backgroundColor = getColor(Number(in_text) + 20);
  }

function getColorHumidity(v) {
    return v >= 100 ? '#009DFF' :
      v >= 94.68 ? '#0DA2FF' :
      v >= 89.42 ? '#1AA7FF' :
      v >= 84.16 ? '#28ACFF' :
      v >= 78.90 ? '#35B1FF' :
      v >= 73.64 ? '#43B6FF' :
      v >= 68.38 ? '#50BBFF' :
      v >= 63.12 ? '#5DC1FF' :
      v >= 57.86 ? '#6BC6FF' :
      v >= 52.60 ? '#78CBFF' :
      v >= 47.34 ? '#86D0FF' :
      v >= 42.08 ? '#93D5FF' :
      v >= 36.82 ? '#A1DAFF' :
      v >= 31.56 ? '#AEE0FF' :
      v >= 26.30 ? '#BBE5FF' :
      v >= 21.04 ? '#C9EAFF' :
      v >= 15.78 ? '#D6EFFF' :
      v >= 10.52 ? '#E4F4FF' :
      v >= 5.26 ? '#F1F9FF' :
      v >= 0 ? '#FFFFFF' :
              '#FFFFFF'; 
  }
  