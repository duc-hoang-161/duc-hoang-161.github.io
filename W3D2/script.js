'use strict';
(function($) {
  let intervalId;
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomColor() {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    return `#${Array(6)
      .fill('')
      .map(() => hex[randomNumber(0, hex.length - 1)])
      .join('')}`;
  }

  function reset() {
    clearInterval(intervalId);
    $('#start').prop('disabled', false);
  }

  function onClickCircle() {
    $(this).remove();
    if (!$('.circle').length) reset();
  }

  function getRandomPosition() {
    const width = $(document).width();
    const height = $(document).height();
    return {
      top: randomNumber(height / 3, (height * 2) / 3),
      left: randomNumber(width / 3, (width * 2) / 3),
    };
  }

  function growCircles(growth, interval) {
    $('.circle').each(function() {
      $(this).stop();
      $(this).animate(
        {
          width: $(this).width() + growth,
          top: `-=${growth / 2}px`,
          left: `-=${growth / 2}px`,
        },
        interval,
      );
    });
  }

  function addCircles({ width, growth, interval, number }) {
    let listDivs = $();
    for (let i = 0; i < number; i++) {
      listDivs = listDivs.add(
        $('<div>', {
          class: 'circle',
          css: {
            width,
            backgroundColor: getRandomColor(),
            ...getRandomPosition(),
          },
          click: onClickCircle,
        }),
      );
    }
    $('body').append(listDivs);
    intervalId = setInterval(() => growCircles(growth, interval), interval);
  }

  function getInputNumberValue(selector) {
    return parseInt($(selector).val());
  }

  function start() {
    const options = {
      width: getInputNumberValue('#width'),
      growth: getInputNumberValue('#growth'),
      interval: getInputNumberValue('#interval'),
      number: getInputNumberValue('#number-circle'),
    };
    $(this).prop('disabled', true);
    addCircles(options);
  }

  function init() {
    $('#start').click(start);
  }

  window.onload = init;
})(jQuery);
