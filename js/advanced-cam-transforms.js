var objectToScale = null;

function showScaleWindow(object) {
  objectToScale = object;
  var bbox2 = new THREE.Box3().setFromObject(object);
  var width = (bbox2.max.x - bbox2.min.x).toFixed(2);
  var height = (bbox2.max.y - bbox2.min.y).toFixed(2);
  var left = bbox2.min.x.toFixed(2);
  var bottom = bbox2.min.y.toFixed(2);
  var right = bbox2.max.x.toFixed(2);
  var top = bbox2.max.y.toFixed(2);
  var xcenter = (bbox2.max.x - (bbox2.max.x - bbox2.min.x) / 2).toFixed(2);
  var ycenter = (bbox2.max.y - (bbox2.max.y - bbox2.min.y) / 2).toFixed(2);
  // console.log(width, height, left, bottom)
  var template = `
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#scaletab">
      SCALE
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#postab">
      POSITION
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#rotatetab">
      ROTATION
      </a>
    </li>
  </ul>

  <div class="tab-content">
    <div id="scaletab" class="tab-pane fade show active">
      <i class="fas fa-ruler"></i> <b>Scale</b>: <small>` + object.name + `</small>
      <table>
        <tr>
          <td>Width: </td>
          <td>
            <div class="input-addon">
              <span class="input-addon-label-left"><i class="fas fa-ruler-horizontal"></i></span>
              <input type="text" class="cam-form-field" value="` + width + `" id="scaleWidth"  objectseq="` + i + `" style="text-align: right;">
              <span class="input-addon-label-right">mm</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>Height: </td>
          <td>
            <div class="input-addon">
              <span class="input-addon-label-left"><i class="fas fa-ruler-vertical"></i></span>
              <input type="text" class="cam-form-field" value="` + height + `" id="scaleHeight"  objectseq="` + i + `" style="text-align: right;">
              <span class="input-addon-label-right">mm</span>
            </div>
          </td>
        </tr>
      </table>
      <button type="button" class="btn btn-sm btn-danger" onclick="scalewindow.style.visibility = 'hidden';" aria-label="Close">
        Cancel
      </button>
      <button type="button" class="btn btn-sm btn-success" aria-label="Close" onclick="scaleObj()">
        Apply
      </button>
    </div>
    <div id="postab" class="tab-pane fade">
      <i class="far fa-clone"></i> <b>Position</b>: <small>` + object.name + `</small>
      <table>
        <tr>
          <td>
            <div class="input-addon">
            <span class="input-addon-label-left" style="text-align: left;"></span>
            <span class="cam-form-field"><i class="fas fa-align-left"></i></span>
            </div>
          </td>
          <td>
            <div class="input-addon" style="text-align: center;">
            <span class="cam-form-field"><i class="fas fa-align-center"></i></span>
            </div>
          </td>
          <td>
            <div class="input-addon" style="text-align: right;">
            <span class="cam-form-field"><i class="fas fa-align-right"></i></span>
            <span class="input-addon-label-right-sm"></span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="input-addon">
              <span class="input-addon-label-left"><i class="fas fa-ruler-horizontal"></i></span>
              <input type="text" class="cam-form-field" value="` + left + `" id="left"  objectseq="` + i + `" style="text-align: right;">
            </div>
          </td>
          <td>
            <div class="input-addon">
              <input type="text" class="cam-form-field" value="` + xcenter + `" id="xcenter"  objectseq="` + i + `" style="text-align: right;">
            </div>
          </td>
          <td>
            <div class="input-addon">
              <input type="text" class="cam-form-field" value="` + right + `" id="right"  objectseq="` + i + `" style="text-align: right;">
              <span class="input-addon-label-right-sm">mm</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="input-addon">
              <span class="input-addon-label-left"><i class="fas fa-ruler-vertical"></i></span>
              <input type="text" class="cam-form-field" value="` + bottom + `" id="bottom"  objectseq="` + i + `" style="text-align: right;">
            </div>
          </td>
          <td>
            <div class="input-addon">
              <input type="text" class="cam-form-field" value="` + ycenter + `" id="ycenter"  objectseq="` + i + `" style="text-align: right;">
            </div>
          </td>
          <td>
            <div class="input-addon">
              <input type="text" class="cam-form-field" value="` + top + `" id="top"  objectseq="` + i + `" style="text-align: right;">
            <span class="input-addon-label-right-sm">mm</span>
            </div>
          </td>
        </tr>
      </table>
      <button type="button" class="btn btn-sm btn-danger" onclick="scalewindow.style.visibility = 'hidden';" aria-label="Close">
        Cancel
      </button>
      <button type="button" class="btn btn-sm btn-success" aria-label="Close" onclick="moveObj()">
        Apply
      </button>
    </div>
    <div id="rotatetab" class="tab-pane fade">
      <i class="far fa-undo"></i> <b>Rotation</b>: <small>` + object.name + `</small>
      <table>
        <tr>
          <td>Angle: </td>
          <td>
            <div class="input-addon">
              <span class="input-addon-label-left"></span>
              <input type="text" class="cam-form-field" value="45" id="rotationangle"  objectseq="` + i + `" style="text-align: right;">
              <span class="input-addon-label-right">&deg;</span>
            </div>
          </td>
        </tr>
      </table>
      <button type="button" class="btn btn-sm btn-danger" onclick="scalewindow.style.visibility = 'hidden';" aria-label="Close">
        Cancel
      </button>
      <button type="button" class="btn btn-sm btn-success" aria-label="Close" onclick="rotateObj(1)">
        Anticlockwise
      </button>
      <button type="button" class="btn btn-sm btn-success" aria-label="Close" onclick="rotateObj(-1)">
        Clockwise
      </button>
    </div>
  </div>
  `;
  $('#scalewindow').html(template)
  var aspect = width / height
  $("#scaleWidth").keyup(function() {
    var width = Number($(this).val());
    $("#scaleHeight").val((width / aspect).toFixed(3));
  });
  $("#scaleHeight").keyup(function() {
    var height = Number($(this).val());
    $("#scaleWidth").val((height * aspect).toFixed(3));
  });
  $("#left").keyup(function() {
    var newLeft = Number($(this).val());
    var diff = newLeft - Number(left);
    $("#xcenter").val((parseFloat(xcenter) + parseFloat(diff)).toFixed(2));
    $("#right").val((parseFloat(right) + parseFloat(diff)).toFixed(2));
  });

  $("#xcenter").keyup(function() {
    var newxCenter = Number($(this).val());
    var diff = newxCenter - Number(xcenter);
    $("#left").val((parseFloat(left) + parseFloat(diff)).toFixed(2));
    $("#right").val((parseFloat(right) + parseFloat(diff)).toFixed(2));
  });

  $("#right").keyup(function() {
    var newRight = Number($(this).val());
    var diff = newRight - Number(right);
    $("#left").val((parseFloat(left) + parseFloat(diff)).toFixed(2));
    $("#xcenter").val((parseFloat(xcenter) + parseFloat(diff)).toFixed(2));
  });

  $("#top").keyup(function() {
    var newTop = Number($(this).val());
    var diff = newTop - Number(top);
    $("#ycenter").val((parseFloat(ycenter) + parseFloat(diff)).toFixed(2));
    $("#bottom").val((parseFloat(bottom) + parseFloat(diff)).toFixed(2));
  });

  $("#ycenter").keyup(function() {
    var newyCenter = Number($(this).val());
    var diff = newyCenter - Number(ycenter);
    $("#top").val((parseFloat(top) + parseFloat(diff)).toFixed(2));
    $("#bottom").val((parseFloat(bottom) + parseFloat(diff)).toFixed(2));
  });

  $("#bottom").keyup(function() {
    var newBottom = Number($(this).val());
    var diff = newBottom - Number(bottom);
    $("#ycenter").val((parseFloat(ycenter) + parseFloat(diff)).toFixed(2));
    $("#top").val((parseFloat(top) + parseFloat(diff)).toFixed(2));
  });
}

function scaleObj() {
  storeUndo(true);
  var object = objectToScale;
  var bbox2 = new THREE.Box3().setFromObject(object);
  var width = (bbox2.max.x - bbox2.min.x).toFixed(2)
  var height = (bbox2.max.y - bbox2.min.y).toFixed(2)
  var newWidth = $('#scaleWidth').val()
  var newHeight = $('#scaleHeight').val()
  var opt = {
    scale: {
      x: newWidth / width,
      y: newHeight / height,
      z: 1
    }
  }
  for (j = 0; j < object.children.length; j++) {
    alterGeometry(object.children[j].geometry, opt)
  }
  var bbox3 = new THREE.Box3().setFromObject(object);
  // console.log(bbox3, bbox2)
  var xoffset = bbox3.min.x - bbox2.min.x;
  var yoffset = bbox3.min.y - bbox2.min.y;
  console.log(xoffset, yoffset)
  object.translateX(-xoffset)
  object.translateY(-yoffset)
  changePositionToGeoTranslate();
  scalewindow.style.visibility = "hidden";
  $('#scaleWidth').unbind('keyup');
  $('#scaleHeight').unbind('keyup');
}

function moveObj() {
  storeUndo(true);
  var object = objectToScale;
  var bbox2 = new THREE.Box3().setFromObject(object);
  var width = (bbox2.max.x - bbox2.min.x).toFixed(2);
  var height = (bbox2.max.y - bbox2.min.y).toFixed(2);
  var left = bbox2.min.x.toFixed(2);
  var bottom = bbox2.min.y.toFixed(2);
  var right = bbox2.max.x.toFixed(2);
  var top = bbox2.max.y.toFixed(2);
  var xcenter = (bbox2.max.x - (bbox2.max.x - bbox2.min.x) / 2).toFixed(2);
  var ycenter = (bbox2.max.y - (bbox2.max.y - bbox2.min.y) / 2).toFixed(2);
  var newxCenter = $('#xcenter').val()
  var newyCenter = $('#ycenter').val()
  var xoffset = newxCenter - xcenter;
  var yoffset = newyCenter - ycenter;
  object.translateX(xoffset)
  object.translateY(yoffset)
  changePositionToGeoTranslate();
  scalewindow.style.visibility = "hidden";
  $('#left').unbind('keyup');
  $('#xcenter').unbind('keyup');
  $('#right').unbind('keyup');
  $('#top').unbind('keyup');
  $('#ycenter').unbind('keyup');
  $('#bottom').unbind('keyup');
}

function rotateObj(dir) {
  storeUndo(true);
  var object = objectToScale;
  var bbox2 = new THREE.Box3().setFromObject(object);

  var xcenter = (bbox2.max.x - (bbox2.max.x - bbox2.min.x) / 2).toFixed(2);
  var ycenter = (bbox2.max.y - (bbox2.max.y - bbox2.min.y) / 2).toFixed(2);

  // center object on [0,0]
  object.translateX(-xcenter)
  object.translateY(-ycenter)
  changePositionToGeoTranslate();

  // Rotate
  var angle = $("#rotationangle").val() * (Math.PI / 180);

  object.rotateZ(dir * angle);
  object.updateMatrixWorld();
  object.traverse(function(child) {
    // console.log(child);
    if (child.type == "Line") {
      var newVert = [];
      var xpos_offset = child.position.x;
      var ypos_offset = child.position.y;
      // let's create gcode for all points in line
      for (i = 0; i < child.geometry.vertices.length; i++) {
        // Convert to World Coordinates
        var localPt = child.geometry.vertices[i];
        var worldPt = object.localToWorld(localPt.clone());
        var xpos = worldPt.x
        var ypos = worldPt.y
        if (child.geometry.type == "CircleGeometry") {
          xpos = (xpos + xpos_offset);
          ypos = (ypos + ypos_offset);
        }
        var zpos = worldPt.z;

        newVert.push(new THREE.Vector3(xpos, ypos, zpos));
      }
      console.log(child.geometry.vertices[10], newVert[10])
      child.geometry.vertices = newVert;
    }
  });
  object.rotation.z = 0;
  object.translateX(xcenter)
  object.translateY(ycenter)
  changePositionToGeoTranslate();
  scalewindow.style.visibility = "hidden";
}